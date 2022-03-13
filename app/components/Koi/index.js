import Script from "next/script";

function Koi() {
  if (window.innerWidth <= 1030) {
    return null;
  }
  return (
    <>
      <Script src="vendor/koi-animation.min.js" />
      <div id="fishesHolder" className="fishesHolder"></div>
    </>
  );
}

export default Koi;
