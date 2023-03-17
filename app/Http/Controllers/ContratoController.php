<?php

namespace App\Http\Controllers;

use App\Models\ClasificacionContrato;
use App\Models\ContratistaContrato;
use App\Models\Contrato;
use App\Models\SubCategoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ContratoController extends Controller
{

    public function index()
    {
        $buscador_rapido = request("buscador_rapido");
        $entidad_contratante = request("entidad_contratante");
        $objeto = request("objeto");
        $codigo_proceso = request("codigo_proceso");
        $fecha_desde = request("fecha_desde");
        $fecha_hasta = request("fecha_hasta");
        $cuantia_desde = request("cuantia_desde");
        $cuantia_hasta = request("cuantia_hasta");
        $estado_proceso = request("estado_proceso");
        // Revocada,Adjudicada,Cerrada,Desierta,Publicada
        $fecha_publicacion = request("fecha_publicacion");
        $contratos = Contrato::with('fuente')
            ->where(function ($query) use ($buscador_rapido, $entidad_contratante, $objeto, $codigo_proceso, $fecha_desde, $fecha_hasta, $cuantia_desde, $cuantia_hasta, $estado_proceso) {
                if (!is_null($buscador_rapido) && $buscador_rapido != "") {
                    $query->where('entidad_contratante', 'like', '%' . $buscador_rapido . '%')
                        ->orWhere('objeto', 'like', '%' . $buscador_rapido . '%')
                        ->orWhere('modalidad', 'like', '%' . $buscador_rapido . '%')
                        ->orWhere('ubicacion', 'like', '%' . $buscador_rapido . '%');
                }
// Inicio condiciones modal filtro avanzado
                if (!is_null($entidad_contratante) && $entidad_contratante != "") {
                    $query->where('entidad_contratante', 'like', '%' . $entidad_contratante . '%');
                }
                if (!is_null($objeto) && $objeto != "") {
                    $query->where('objeto', 'like', '%' . $objeto . '%');
                }
                if (!is_null($codigo_proceso) && $codigo_proceso != "") {
                    $query->where('codigo_proceso', 'like', '%' . $codigo_proceso . '%');
                }
                if (!is_null($fecha_desde) && $fecha_desde != "") {
                    $query->where('fecha_publicacion', '>=', '' . $fecha_desde . '');
                }
                if (!is_null($fecha_hasta) && $fecha_hasta != "") {
                    $query->where('fecha_publicacion', '<=', '' . $fecha_hasta . '');
                }
                if (!is_null($cuantia_desde) && $cuantia_desde != "") {
                    $query->where('valor', '>=', '' . $cuantia_desde . '');
                }
                if (!is_null($cuantia_hasta) && $cuantia_hasta != "") {
                    $query->where('valor', '<=', '' . $cuantia_hasta . '');
                }
                if (!is_null($codigo_proceso) && $codigo_proceso != "") {
                    $query->where('codigo_proceso', 'like', '%' . $codigo_proceso . '%');
                }
                if (!is_null($estado_proceso) && $estado_proceso != "") {
                    $query->whereIn('estado_proceso', explode(",", $estado_proceso));
                }
// Fin condiciones modal filtro avanzado
            })
            ->where(function ($query) use ($fecha_publicacion) {
                if (!is_null($fecha_publicacion) && $fecha_publicacion != "") {
                    $query->where('fecha_publicacion', request("fecha_publicacion"));
                }
            })
            ->paginate(30);

        foreach ($contratos as $key => $value) {
            $contratista = ContratistaContrato::where('id_contrato', $value->id)->first();
            if ($contratista) {
                $value->contratista = $contratista->nombre;
            }

            $actividad_economica = ClasificacionContrato::where('id_contrato', $value->id)->first();
            if ($actividad_economica) {
                $sub_categoria = SubCategoria::find($actividad_economica->id_sub_categoria);
                $value->actividad_economica = $sub_categoria->nombre;
            }
        }

        if (request()->has("type") /* && request('type') == "fetch" */) { //dd(request('type'));
            return json_encode($contratos);
        } else {
            return Inertia::render(
                'Contratos/Index', ['contratos' => $contratos]
            );
        }
    }

    public function paginador($idContrato, $page, $estado)
    {
        $pagina = 1;
        $numElementosPagina = 30;
        $totalElemetosPaginados = 1;

        $buscador_rapido = request("buscador_rapido");
// Inicio variables modal filtro avanzado
        $entidad_contratante = request("entidad_contratante");
        $objeto = request("objeto");
        $codigo_proceso = request("codigo_proceso");
// Fin variables modal filtro avanzado
        $fecha_publicacion = request("fecha_publicacion");

        $contratosAll =
        Contrato::where(
            function ($query) use ($buscador_rapido) {
                if (!is_null($buscador_rapido) && $buscador_rapido != "") {
                    $query->where('entidad_contratante', 'like', '%' . $buscador_rapido . '%')
                        ->orWhere('objeto', 'like', '%' . $buscador_rapido . '%')
                        ->orWhere('modalidad', 'like', '%' . $buscador_rapido . '%')
                        ->orWhere('ubicacion', 'like', '%' . $buscador_rapido . '%');
                }
// Inicio condiciones modal filtro avanzado
                if (!is_null($entidad_contratante) && $entidad_contratante != "") {
                    $query->where('entidad_contratante', 'like', '%' . $entidad_contratante . '%');
                }
                if (!is_null($objeto) && $objeto != "") {
                    $query->where('objeto', 'like', '%' . $objeto . '%');
                }
                if (!is_null($codigo_proceso) && $codigo_proceso != "") {
                    $query->where('codigo_proceso', 'like', '%' . $codigo_proceso . '%');
                }
                if (!is_null($fecha_desde) && $fecha_desde != "") {
                    $query->where('fecha_publicacion', '>=', '' . $fecha_desde . '');
                }
                if (!is_null($fecha_hasta) && $fecha_hasta != "") {
                    $query->where('fecha_publicacion', '<=', '' . $fecha_hasta . '');
                }
                if (!is_null($cuantia_desde) && $cuantia_desde != "") {
                    $query->where('valor', '>=', '' . $cuantia_desde . '');
                }
                if (!is_null($cuantia_hasta) && $cuantia_hasta != "") {
                    $query->where('valor', '<=', '' . $cuantia_hasta . '');
                }
                if (!is_null($estado_proceso) && $estado_proceso != "") {
                    $query->whereIn('estado_proceso', explode(",", $estado_proceso));
                }
// Fin condiciones modal filtro avanzado
            }
        )
            ->where(function ($query) use ($fecha_publicacion) {
                if (!is_null($fecha_publicacion) && $fecha_publicacion != "") {
                    $query->where('fecha_publicacion', request("fecha_publicacion"));
                }
            })
            ->count();

        $contratos = Contrato::with('fuente' /*, 'clasificaciones', 'contratistas'*/)
            ->where(function ($query) use ($estado, $idContrato) {
                if ($estado == "next") {
                    $query->where('id', '>', $idContrato);
                } else {
                    $query->where('id', '<', $idContrato);
                }
            })
            ->where(function ($query) use ($buscador_rapido) {
                if (!is_null($buscador_rapido) && $buscador_rapido != "") {
                    $query->where('entidad_contratante', 'like', '%' . $buscador_rapido . '%')
                        ->orWhere('objeto', 'like', '%' . $buscador_rapido . '%')
                        ->orWhere('modalidad', 'like', '%' . $buscador_rapido . '%')
                        ->orWhere('ubicacion', 'like', '%' . $buscador_rapido . '%');
                }
// Inicio condiciones modal filtro avanzado
                if (!is_null($entidad_contratante) && $entidad_contratante != "") {
                    $query->where('entidad_contratante', 'like', '%' . $entidad_contratante . '%');
                }
                if (!is_null($objeto) && $objeto != "") {
                    $query->where('objeto', 'like', '%' . $objeto . '%');
                }
                if (!is_null($codigo_proceso) && $codigo_proceso != "") {
                    $query->where('codigo_proceso', 'like', '%' . $codigo_proceso . '%');
                }
                if (!is_null($fecha_desde) && $fecha_desde != "") {
                    $query->where('fecha_publicacion', '>=', '' . $fecha_desde . '');
                }
                if (!is_null($fecha_hasta) && $fecha_hasta != "") {
                    $query->where('fecha_publicacion', '<=', '' . $fecha_hasta . '');
                }
                if (!is_null($cuantia_desde) && $cuantia_desde != "") {
                    $query->where('valor', '>=', '' . $cuantia_desde . '');
                }
                if (!is_null($cuantia_hasta) && $cuantia_hasta != "") {
                    $query->where('valor', '<=', '' . $cuantia_hasta . '');
                }
                if (!is_null($estado_proceso) && $estado_proceso != "") {
                    $query->whereIn('estado_proceso', explode(",", $estado_proceso));
                }
// Fin condiciones modal filtro avanzado
            })
            ->where(function ($query) use ($fecha_publicacion) {
                if (!is_null($fecha_publicacion) && $fecha_publicacion != "") {
                    $query->where('fecha_publicacion', request("fecha_publicacion"));
                }
            })
            ->paginate(30);

        if ($estado == "prev") {
//$contratos = $contratos->reverse();
//$contratos = $contratos->values();
            $pagina = $page - $pagina;
            $numElementosPagina = ($numElementosPagina * ($page - 1));
            $totalElemetosPaginados = ($numElementosPagina - 30) + 1;
        } else {
            $numElementosPagina = $numElementosPagina * ($page + 1);
            $pagina = $pagina + $page;
            $totalElemetosPaginados = ($numElementosPagina - 30) + 1;
        }

        foreach ($contratos as $key => $value) {
            $contratista = ContratistaContrato::where('id_contrato', $value->id)->first();
            if ($contratista) {
                $value->contratista = $contratista->nombre;
            }

            $actividad_economica = ClasificacionContrato::where('id_contrato', $value->id)->first();
            if ($actividad_economica) {
                $sub_categoria = SubCategoria::find($actividad_economica->id_sub_categoria);
                $value->actividad_economica = $sub_categoria->nombre;
            }
        }

        return Inertia::render(
            'Contratos/Index',
            [
                'contratos' => $contratos,
                'totalContratos' => $contratosAll,
                'pagina' => $pagina,
                'numElementosPagina' => $numElementosPagina,
                'totalElemetosPaginados' => $totalElemetosPaginados,
            ]
        );
    }

    public function create()
    {
        return Inertia::render('Contrato/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_user_clasificador' => 'required',
        ]);

        Contrato::create($request->all());
        return Redirect::route('contratos.index');
    }

    public function show(Contrato $contrato)
    {
    }

    public function edit(Contrato $contrato)
    {
        return Inertia::render('Contrato/Edit', ['contrato', $contrato]);
    }

    public function update(Request $request, Contrato $contrato)
    {
        $contrato->update($request->all());
        return Redirect::route('contrato.index');
    }

    public function destroy(Contrato $contrato)
    {
        $contrato->delete();
        return Redirect::route('contratos.index');
    }
}
