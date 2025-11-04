import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get the authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const method = req.method;

    // GET - Fetch appointments
    if (method === 'GET') {
      // First get patient record
      const { data: patientData, error: patientError } = await supabaseClient
        .from('patients')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (patientError) {
        console.error('Error fetching patient:', patientError);
        throw new Error('Patient not found');
      }

      const { data, error } = await supabaseClient
        .from('appointments')
        .select('*')
        .eq('patient_id', patientData.id)
        .order('appointment_date', { ascending: false });

      if (error) {
        console.error('Error fetching appointments:', error);
        throw error;
      }

      return new Response(JSON.stringify({ appointments: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // POST - Create appointment
    if (method === 'POST') {
      const body = await req.json();

      // Get patient record
      const { data: patientData, error: patientError } = await supabaseClient
        .from('patients')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (patientError) {
        console.error('Error fetching patient:', patientError);
        throw new Error('Patient not found. Please register as a patient first.');
      }

      const { data, error } = await supabaseClient
        .from('appointments')
        .insert([{ ...body, patient_id: patientData.id }])
        .select()
        .single();

      if (error) {
        console.error('Error creating appointment:', error);
        throw error;
      }

      return new Response(JSON.stringify({ appointment: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 201,
      });
    }

    // PUT - Update appointment
    if (method === 'PUT') {
      const body = await req.json();
      const { id, ...updateData } = body;

      if (!id) {
        throw new Error('Appointment ID is required');
      }

      // Verify ownership through patient relationship
      const { data: patientData } = await supabaseClient
        .from('patients')
        .select('id')
        .eq('user_id', user.id)
        .single();

      const { data, error } = await supabaseClient
        .from('appointments')
        .update(updateData)
        .eq('id', id)
        .eq('patient_id', patientData?.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating appointment:', error);
        throw error;
      }

      return new Response(JSON.stringify({ appointment: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // DELETE - Cancel appointment
    if (method === 'DELETE') {
      const url = new URL(req.url);
      const id = url.searchParams.get('id');

      if (!id) {
        throw new Error('Appointment ID is required');
      }

      // Verify ownership
      const { data: patientData } = await supabaseClient
        .from('patients')
        .select('id')
        .eq('user_id', user.id)
        .single();

      const { error } = await supabaseClient
        .from('appointments')
        .delete()
        .eq('id', id)
        .eq('patient_id', patientData?.id);

      if (error) {
        console.error('Error deleting appointment:', error);
        throw error;
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 405,
    });
  } catch (error: any) {
    console.error('Error in appointments function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
