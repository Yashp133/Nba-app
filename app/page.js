import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white">
      <Navbar />
      <div className="card w-96 shadow-xl rounded-2xl mt-8 bg-secondary"> {/* Replaced Card */}
        <div className="card-content p-6"> {/* Replaced CardContent */}
          <h1 className="text-3xl font-bold mb-4">NBA App</h1>
          <p className="text-lg">Stay updated with NBA teams, players, and games!</p>
          <button className="btn btn-primary mt-4 text-white">Explore</button> {/* Replaced Button */}
        </div>
      </div>
    </div>
  );
}