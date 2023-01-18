export default function Login({ setCanvi }) {
    return (
      <>
        <h1>Regístrate</h1>
        <button
          onClick={() => {
            setCanvi(false);
          }}
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </button>
      </>
    );
  }
  