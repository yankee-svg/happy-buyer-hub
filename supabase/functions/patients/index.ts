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

    const url = new URL(req.url);
    const method = req.method;

    // GET - Fetch patient record
    if (method === 'GET') {
      const { data, error } = await supabaseClient
        .from('patients')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching patient:', error);
        throw error;
      }

      return new Response(JSON.stringify({ patient: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // POST - Create patient record
    if (method === 'POST') {
      const body = await req.json();

      const { data, error } = await supabaseClient
        .from('patients')
        .insert([{ ...body, user_id: user.id }])
        .select()
        .single();

      if (error) {
        console.error('Error creating patient:', error);
        throw error;
      }

      return new Response(JSON.stringify({ patient: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 201,
      });
    }

    // PUT - Update patient record
    if (method === 'PUT') {
      const body = await req.json();

      const { data, error } = await supabaseClient
        .from('patients')
        .update(body)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating patient:', error);
        throw error;
      }

      return new Response(JSON.stringify({ patient: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 405,
    });
  } catch (error: any) {
    console.error('Error in patients function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
