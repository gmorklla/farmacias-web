'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('AdminCtrl', ['$scope', 'prettyUrlSpc', function($scope, prettyUrlSpc) {

    	$scope.guardado = null;

        // Referencia a base de datos en Firebase
        var ref = new Firebase("https://farmaciasdesimilares.firebaseio.com/");

        // Variable que sirve para mostrar u ocultar alerta de login
        $scope.logInError = false;
        // Inicializa variable email de login
        $scope.email = '';
        // Inicializa variable password de login
        $scope.password = '';

        // Función que se usa para Login
        $scope.login = function () {
            ref.authWithPassword({
              email    : $scope.email,
              password : $scope.password
            }, function(error, authData) {
              if (error) {
                loginErrorHandler(error);                    
              } else {
                loginSuccessHanlder(authData);
              }
            });
        };


        // Función que maneja error en login
        function loginErrorHandler(error) {
            $scope.logInError = true;
            console.log(error.code);
            if (error.code === 'INVALID_PASSWORD') {
                $scope.loginErrorMsg = 'Esa no es tu contraseña';
            } else if (error.code === 'INVALID_USER') {
                $scope.loginErrorMsg = 'Ese usuario no existe';
            } else if (error.code === 'INVALID_EMAIL') {
                $scope.loginErrorMsg = 'Ese email no es válido';
            }
            digiere();
        }

        // Función que maneja login exitoso
        function loginSuccessHanlder(authData) {
            console.info(authData);
        }


        // Función para logout
        $scope.logout = function () {
            ref.unauth();
        };

        // Función callback para el estado de la autenticación
        function authDataCallback(authData) {
          if (authData) {
            $scope.usuario = authData.password.email;
            console.log("User " + authData.uid + " is logged in with " + authData.password.email);
            digiere();
            verificaDatosEnFirebase();
          } else {
            $scope.usuario = null;
            console.log("User is logged out");
          }
        }

        // Verifica que el usuario esté en la Firebase/users
        function verificaDatosEnFirebase() {
            var user = $scope.usuario.slice(0, $scope.usuario.indexOf("@"));
            var usuarioAVerificar = 'users/' + user;
            ref.child(usuarioAVerificar).on("value", function(snapshot) {
                if (!snapshot.val()) {
                    //registraUsuario(usuarioAVerificar);
                } else {
                    $scope.usuario = snapshot.val().full_name;
                    digiere();
                    console.log(snapshot.val());
                }
            });            
        }

        // Referencia a base de datos en Firebase
        var refNotas = new Firebase("https://farmaciasdesimilares.firebaseio.com/notas");        

        refNotas.once("value", function(snapshot) {
            $scope.numNotas = snapshot.numChildren();
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });

        // Función para guardar las notas
        $scope.guardaNotaInfo = function() {
            var postsRef = ref.child("notas");

            postsRef.push({
                autor: $scope.usuario,
                url: $scope.urlNotas,
                titulo: $scope.tituloNotas,
                subtitulo: $scope.subtituloNotas,
                hashtag: $scope.hashtagNotas,
                intro: $scope.cuerpoNotas,
                shareText: $scope.shareTextNotas,
                key: $scope.numNotas + 1,
                htmlPath : 'views/siminotas/' + prettyUrlSpc.prettyUrl($scope.urlNotas),
                timestamp: Firebase.ServerValue.TIMESTAMP
            }, function(error) {
			  if (error) {
			    console.error("La nota no se pudo guardas: " + error);
			  } else {
			  	notaGuardada();
			  }
			});

        };

        // Callback success
        function notaGuardada() {
		    console.info("La nota se guardó correctamente.");
		    $scope.guardado = true;
			document.getElementById("notasFirebaseForm").reset();
			$scope.notasFirebaseForm.$setUntouched();
			digiere();
        }

        // Monitorea el estado del usuario | conectado o desconectado y llama función callback para manejar los cambios de estado
        ref.onAuth(authDataCallback);

        // Procesa datos que angular todavía no ha digerido
        function digiere() {
            if(!$scope.$$phase) {
                $scope.$digest();
            }                
        }     

    }]);
