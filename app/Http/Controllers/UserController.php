<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use PhpParser\Node\Stmt\Return_;
use Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use App\Mail\VerificationCodeMailable;
use App\Models\PasswordReset;
use Illuminate\Auth\Passwords\DatabaseTokenRepository;
use Illuminate\Support\Facades\Mail;
use DB;
use Exception;
use App\Models\Plane;
class UserController extends Controller
{

    public function index(){
        
        $buscador_rapido = request("buscador_rapido");
        $fecha_publicacion = request("fecha_publicacion");

        $usuarios =
        User::where(
            function ($query) use ($buscador_rapido) {
                if (!is_null($buscador_rapido) && $buscador_rapido != "") {
                    $query->where('name', 'like', '%' . $buscador_rapido . '%')
                        ->orWhere('email', 'like', '%' . $buscador_rapido . '%')
                        ->orWhere('celular', 'like', '%' . $buscador_rapido . '%')
                        ->orWhere('identificacion', 'like', '%' . $buscador_rapido . '%');
                }
            }
        )
        ->where(function ($query) use ($fecha_publicacion) {
            if (!is_null($fecha_publicacion) && $fecha_publicacion != "") {
                $query->where('created_at', request("fecha_publicacion"));
            }
        })
        ->paginate(30);

        if (request()->has("type") ) {
            return json_encode($usuarios);
        } else {
            return Inertia::render(
                'Usuarios/Index',['usuarios' => $usuarios]
            );
        }
      
    }

    public function paginador($idUsuario, $page, $estado)
    {
        $pagina = 1;
        $numElementosPagina = 30;
        $totalElemetosPaginados = 1;

        $buscador_rapido = request("buscador_rapido");
        $fecha_publicacion = request("fecha_publicacion");

        $usuariosAll =
        User::where(
            function ($query) use ($buscador_rapido) {
                if (!is_null($buscador_rapido) && $buscador_rapido != "") {
                    $query->where('name', 'like', '%' . $buscador_rapido . '%')
                        ->orWhere('email', 'like', '%' . $buscador_rapido . '%')
                        ->orWhere('celular', 'like', '%' . $buscador_rapido . '%')
                        ->orWhere('identificacion', 'like', '%' . $buscador_rapido . '%');
                }
            }
        )
        ->where(function ($query) use ($fecha_publicacion) {
            if (!is_null($fecha_publicacion) && $fecha_publicacion != "") {
                $query->where('created_at', request("fecha_publicacion"));
            }
        })
        ->count();

        
        $usuarios = User::where(function ($query) use ($estado, $idUsuario) {
                if ($estado == "next") {
                    $query->where('id', '>', $idUsuario);
                } else {
                    $query->where('id', '<', $idUsuario);
                }
            })
            ->where(function ($query) use ($buscador_rapido) {
                if (!is_null($buscador_rapido) && $buscador_rapido != "") {
                    $query->where('name', 'like', '%' . $buscador_rapido . '%')
                        ->orWhere('email', 'like', '%' . $buscador_rapido . '%')
                        ->orWhere('celular', 'like', '%' . $buscador_rapido . '%')
                        ->orWhere('identificacion', 'like', '%' . $buscador_rapido . '%');
                }
            })
            ->where(function ($query) use ($fecha_publicacion) {
                if (!is_null($fecha_publicacion) && $fecha_publicacion != "") {
                    $query->where('created_at', request("fecha_publicacion"));
                }
            })
            ->paginate(30);

            if ($estado == "prev") {
                $pagina = $page - $pagina;
                $numElementosPagina = ($numElementosPagina * ($page - 1));
                $totalElemetosPaginados = ($numElementosPagina - 30) + 1;
            } else {
                $numElementosPagina =  $numElementosPagina * ($page + 1);
                $pagina = $pagina + $page;
                $totalElemetosPaginados = ($numElementosPagina - 30) + 1;
            }
    

        //old
      /*   if ($estado == "next") {
            $usuarios = User::where('id', '>', $idUsuario)
                ->limit(30)
                ->get();
                $pagina = $pagina + $page;
                $numElementosPagina =  $numElementosPagina * ($page+1);
                $totalElemetosPaginados = ($numElementosPagina -30) + 1;
        } else {
            $usuarios = User::where('id', '<', $idUsuario)
                ->orderBy('id', 'desc')
                ->limit(30)
                ->get()
                ->reverse();
                $usuarios= $usuarios->values();
                $pagina = $page - $pagina;
                $numElementosPagina = ($numElementosPagina * ($page-1));
                $totalElemetosPaginados = ($numElementosPagina -30) + 1 ;
        } */


        return Inertia::render(
            'Usuarios/Index',
            [
                'usuarios' => $usuarios,
                'totalUsuarios' =>  $usuariosAll,
                'pagina' => $pagina,
                'numElementosPagina' => $numElementosPagina,
                'totalElemetosPaginados' => $totalElemetosPaginados,
                'usuariosTotales' => "usuarios totales"
            ]
        );
    }





    public function create()
    {
        $planes = Plane::all();
        return Inertia::render('Usuarios/Crear', [
            'planesAll' => $planes,

        ]);
    }

    public function edit(User $usuario)
    {
     
        $planes = Plane::all();
        $planUsuario = Plane::find($usuario->idplan);
        return Inertia::render('Usuarios/Editar', [
            'usuario' => $usuario,
            'planesAll' => $planes,
            'planUsuario' =>$planUsuario
        ]);
    }


    public function store(Request $request)
    {
        //validamos los datos
        $validated = $request->validate([
            'nombre_completo' => 'required|string|max:100',
            'identificacion' => 'required',
            'celular' => 'required|max:15',
            'indicativo' => 'required|max:20',
            'telefono_fijo' => '|max:10',
            'direccion' => 'required|max:50',
            'ciudad' => 'required|max:50',
            'pais' => 'required|max:50',
            'idplan' => 'required',
            'email' => ['required', 'email', 'unique:users,email'],
            'fecha_vencimiento' => 'required',
            'estado' => 'required',
            'origen' => 'required|max:30',
            'password' => 'required|string|max:255',

            'nombre_empresa' => 'required|max:50',
            'nit_empresa' => 'required|max:20',
            'pais_empresa' => 'required|max:50',
            'ciudad_empresa' => 'required|max:50',
            'direccion_empresa' => 'required|max:50',
            'celular_empresa' => 'required|max:15',
            'indicativo_empresa' => 'required|max:20',
            'telefono_fijo_empresa' => 'required|max:15',
            'email_facturacion_empresa' => 'required', 'email',
            'descripcion_actividad_economica' => 'required',
        ]);

        User::Create($validated);

        return redirect(route('usuarios.index'));
    }



    public function update(Request $request, User $usuario)
    {
        $validated = $request->validate([
            'nombre_completo' => 'required|string|max:100',
            'identificacion' => 'required',
            'celular' => 'required|max:15',
            'indicativo' => 'required|max:20',
            'telefono_fijo' => '|max:10',
            'direccion' => 'required|max:50',
            'ciudad' => 'required|max:50',
            'pais' => 'required|max:50',
            'idplan' => 'required',
            'email' => ['required', 'email'],
            'fecha_vencimiento' => 'required',
            'estado' => 'required',
            'origen' => 'required|max:30',
            'password' => 'required|string|max:255',

            'nombre_empresa' => 'required|max:50',
            'nit_empresa' => 'required|max:20',
            'pais_empresa' => 'required|max:50',
            'ciudad_empresa' => 'required|max:50',
            'direccion_empresa' => 'required|max:50',
            'celular_empresa' => 'required|max:15',
            'indicativo_empresa' => 'required|max:20',
            'telefono_fijo_empresa' => 'required|max:15',
            'email_facturacion_empresa' => 'required', 'email',
            'descripcion_actividad_economica' => 'required|max:30',


        ]);
        $usuario->update($validated);
        return redirect(route('usuarios.index'));
    }


    public function destroy(User $usuario)
    {
       
        if( $usuario->delete()){
            return json_encode("Success");
        }else{
            return json_encode("Error");
        }
        


    /*     return redirect(route('usuarios.index')); */
    
    }

    public function userValidate($email)
    {
        $response = "";
        $user = User::where('email', $email)->first();
        if (is_null($user)) {
            $response = 'Failed';
        } else {
            //Guardar codigo de verificacion
            $verification_code = rand(0000, 9999);
            $user->verification_code = $verification_code;
            $user->save();
            //Enviar correo electronico con codigo
            $mail = new VerificationCodeMailable($user);
            try{
                Mail::to($user->email)->send($mail);
            }catch(Exception $e){
                print_r($e->getMessage());
            }
            $response = 'Success';
        }
        return json_encode($response);
    }

    public function codeValidate($email, $verification_code)
    {
        $user = User::where('email', $email)
            ->where('verification_code', $verification_code)
            ->first();

        if (is_null($user)) {
            $response = 'Failed';
        } else {
            //Guardar token
            $token = hash_hmac('sha256', Str::random(40), true);
            $password_reset = PasswordReset::where('email', $user->email)->first();
            if ($password_reset) {
                $password_reset->delete();
            }
            $password_reset = new PasswordReset;
            $password_reset->token = Hash::make($token);
            $password_reset->email = $user->email;
            $password_reset->save();
            $response = $token;
        }
        return json_encode($response);
    }

    public function actualizarContrasena(Request $request)
    {
        $response = "";

        //Validar token
        $password_reset = PasswordReset::where('email', $request->email)/* ->where('token', Hash::make($request->token)) */->first();
        if ($password_reset) {
            $user = User::where('email', $request->email)->first();
            if ($user) {
                $user->password = Hash::make($request->password);
                $user->save();
                $response = redirect(route('welcome'));
            } else {
                $response = json_encode("El usuario no existe");
            }
        } else {
            $response = json_encode("La solicitud de cambio de contraseña no existe");
        }

        return $response;
    }
}
