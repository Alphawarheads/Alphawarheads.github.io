import { Navbar, Welcome, Test, Footer, Services, Transactions, MapSection, Message } from "./components";
const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />

      <MapSection />
        <Test />


    </div>
    <Services />
    <Transactions />
    <Message />
    <Footer />
  </div>
);

export default App;
