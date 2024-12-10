import "./aboutOverlay.css"


const About =({showAbout,setShowAbout})=> {

    if(!showAbout)  return null
    
    return (
        <>
        <div onClick={()=>setShowAbout(false)} className="black-overlay">

        </div>

        <div className="about-container">
            <h1>Apa itu Hitung Cepat</h1>
            <p>Berhitung Cepat adalah cara seru buat belajar berhitung dengan cepat! Teknik ini sebenarnya sudah dikenal sejak dulu, biasanya dengan bantuan jari tangan. Sedangkan itu Hitung Cepat adalah sebuah game berbasis web yang dirancang untuk melatih kecepatan berpikir kamu dalam menghitung operasi bilangan. Game ini adalah bentuk revolusi dari metode berhitung tradisional ke cara yang lebih digital dan kekinian.</p>
            <h1>Cara Kerja</h1>
            <h3>1. Soal Acak yang Menantang</h3>
            <p>Game ini menggunakan algoritma untuk menghasilkan persamaan bilangan bulat secara acak. Salah satu angka atau operasinya akan dihilangkan, dan tugas kamu adalah menebak angka atau operasi yang hilang agar persamaan tersebut menjadi benar.</p>

            <h3>2. Tantangan Waktu</h3>
            <p>Kamu harus menjawab setiap soal dalam waktu yang ditentukan. Kalau tidak berhasil menjawab tepat waktu, permainan akan berakhir.</p>

            <h3>3. Poin dan Papan Peringkat</h3>
            <p>Setiap jawaban benar akan memberi kamu poin, tapi jangan khawatir kalau salah, poin kamu nggak akan berkurang! Kalau kamu benar-benar jago berhitung, kamu bisa masuk ke papan peringkat tertinggi dan tunjukkan kehebatanmu!</p>
         
            <h1>Fun Fact</h1>
            <p>Tau nggak sih? Saat ini, Artificial Intelligence (AI) punya pengaruh besar dalam banyak hal, termasuk dunia pendidikan. Bahkan, game ini 90% dibuat dengan bantuan pemrogamman oleh AI lhoo</p>
        </div>
        </>
    )
}

export default About