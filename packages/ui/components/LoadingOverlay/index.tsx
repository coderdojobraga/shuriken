import styles from "./style.module.css";

const LoadingOverlay = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-700 opacity-75">
        <div
          className={`${styles.loader} border-t-primary mb-4 h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear`}
        />
        <h2 className="text-center text-xl font-semibold text-white">
          Carregando...
        </h2>
        <p className="w-1/3 text-center text-white">
          Isto pode levar algum tempo, por favor não feche esta página.
        </p>
      </div>
    </>
  );
};

export default LoadingOverlay;
