export default function Register({ setCanvi }) {
    return (
      <>
        <h1>Log In</h1>
        <button
          onClick={() => {
            setCanvi(true);
          }}
        >
          ¿No tienes cuenta? Regístrate
        </button>
      </>
    );
  }
  