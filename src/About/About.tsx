import React from 'react'
import './about.css'
import { Button } from 'react-bootstrap'
function About() {
  return (
    <div className='about-sec'>
       
        <div className='about-cont1'>
            <div className='we'>
                <h4 className='h-we'>Tentang Kami</h4>
                <p>
                    Selamat datang di <span className='nm-wr'> Warung Bang Salim</span> disini menyediakan berbagai bahan makanan segar dan berkualitas tinggi, mulai dari sayur-sayuran organik, buah-buahan segar, daging berkualitas, hingga bumbu dapur pilihan. Kami percaya bahwa makanan yang sehat dimulai dari bahan yang berkualitas, dan kami berkomitmen untuk menyediakan pilihan terbaik bagi keluarga Anda.
                </p>
            </div>
            <div className='visi-misi'>
                <div className='vm-tag'>
                   <h4 className='vm-head'>Visi & Misi</h4>
                </div>
                <div className='vm-cont'>
                <div className='visi'>
                     <h6>Visi</h6>
                    <ul className='ls-vm'>
                        <li> "Menjadi penyedia bahan pangan segar dan berkualitas terbaik yang dipercaya oleh masyarakat untuk memenuhi kebutuhan hidup sehat setiap hari."</li>
                        <li>"Menciptakan kehidupan lebih sehat dengan menyediakan bahan makanan segar, bergizi, dan terjangkau untuk setiap keluarga."</li>
                        <li>"Menjadi pemimpin pasar dalam penyediaan bahan makanan segar, dari sayur, buah, daging, hingga bumbu dapur, yang mendukung gaya hidup sehat dan berkelanjutan."</li>
                    </ul>
                </div>
                <div className='misi'>
                    <h6>Misi</h6>
                    <ul className='ls-vm'>
                        <li>"Menyediakan sayur, buah, daging, dan bumbu dapur berkualitas tinggi dengan harga yang bersaing."</li>
                        <li>"Mengutamakan kualitas produk dengan bekerja sama dengan petani, peternak, dan pemasok lokal untuk memastikan kesegaran dan keberlanjutan."</li>
                        <li>"Memberikan pelayanan terbaik dan kemudahan dalam berbelanja bahan pangan yang sehat melalui platform online dan toko fisik."</li>
                        <li>"Berkomitmen untuk mengedukasi masyarakat tentang pentingnya konsumsi bahan makanan segar dan bergizi dalam mendukung pola makan sehat."</li>
                        <li>"Meningkatkan aksesibilitas bahan makanan segar dan berkualitas dengan distribusi yang efisien dan ramah lingkungan."</li>
                    </ul>
                </div>
                </div>
                
            </div>
        </div>
        <div className='about-cont2'>
            <div className='map-cont'>
             <h4>Lokasi</h4>
             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.8293851839228!2d106.80835888108115!3d-6.3590676479833474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ee985076aac7%3A0x7c24e61cf89d2b41!2sJl.%20Cipedak%20II%20No.09%2C%20Srengseng%20Sawah%2C%20Kec.%20Jagakarsa%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012640!5e0!3m2!1sen!2sid!4v1740355196300!5m2!1sen!2sid" 
             className='map-fr'  loading="lazy" ></iframe>
            </div>
            <div className='cnt-cont'>
              <h4>Kontak</h4>
              <div className='btn-cont'>
                <Button className='btn-cnt'>Whats'App</Button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default About