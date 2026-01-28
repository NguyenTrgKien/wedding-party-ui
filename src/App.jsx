import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import HallDetails from "./page/HallDetail";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 flex flex-col">
      <Header />

      <HallDetails />
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center">
          <i className="fas fa-rings-wedding text-6xl text-rose-400 mb-4"></i>
          <h1 className="text-4xl md:text-6xl text-gray-800 mb-4">
            Chúng Tôi Kết Hôn
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Nội dung website của bạn ở đây
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div id="story" className="bg-white p-8 rounded-lg shadow-md">
              <i className="fas fa-book-heart text-4xl text-rose-500 mb-4"></i>
              <h2 className="text-2xl font-serif mb-2">Câu chuyện tình yêu</h2>
              <p className="text-gray-600">
                Mọi câu chuyện đẹp đều có khởi đầu...
              </p>
            </div>

            <div id="gallery" className="bg-white p-8 rounded-lg shadow-md">
              <i className="fas fa-images text-4xl text-rose-500 mb-4"></i>
              <h2 className="text-2xl font-serif mb-2">Album ảnh</h2>
              <p className="text-gray-600">
                Những khoảnh khắc đáng nhớ của chúng tôi
              </p>
            </div>

            <div id="event" className="bg-white p-8 rounded-lg shadow-md">
              <i className="fas fa-calendar-heart text-4xl text-rose-500 mb-4"></i>
              <h2 className="text-2xl font-serif mb-2">Thông tin sự kiện</h2>
              <p className="text-gray-600">Thời gian và địa điểm tổ chức</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
