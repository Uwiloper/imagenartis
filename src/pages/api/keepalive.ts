import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const startTime = Date.now();
  
  try {
    // Consulta fantasma ligera a Supabase para renovar la actividad del proyecto
    const { data, error } = await supabase
      .from('site_sections')
      .select('id')
      .limit(1);

    if (error) {
      console.warn('[KeepAlive] Supabase ping warning:', error.message);
      return new Response(
        JSON.stringify({
          status: 'warning',
          message: error.message,
          durationMs: Date.now() - startTime,
          timestamp: new Date().toISOString(),
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        status: 'alive',
        message: 'Supabase keep-alive ping exitoso (proyecto activo)',
        dataFound: data?.length || 0,
        durationMs: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      }
    );
  } catch (err: any) {
    console.error('[KeepAlive] Error inesperado en ping:', err);
    return new Response(
      JSON.stringify({
        status: 'error',
        message: err?.message || 'Error desconocido',
        durationMs: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      }
    );
  }
};
