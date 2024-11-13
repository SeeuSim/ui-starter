import { HorizontalScrollSection } from "./components/custom/horizontal-scroll-section";

function App() {
  return (
    <div>
      <section className="">
        <div className="h-screen bg-pink-300 grid place-items-center text-8xl font-bold">
          VSection 1
        </div>
        <div className="h-screen bg-red-300 grid place-items-center text-8xl font-bold">
          VSection 2
        </div>
      </section>
      <HorizontalScrollSection />
      <section>
        <div className="bg-purple-300 h-screen grid place-items-center text-8xl font-bold">
          VSection 3
        </div>
        <div className="bg-indigo-300 h-screen grid place-items-center text-8xl font-bold">
          VSection 4
        </div>
      </section>
    </div>
  );
}

export default App;
