import Footer from './Component/Footer'
import Manager from './Component/Manager'
import NavBar from './Component/NavBar'

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <Manager />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App;
