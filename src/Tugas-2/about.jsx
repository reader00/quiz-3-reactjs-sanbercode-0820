import React from "react";

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <h1>Data Peserta Sanbercode Bootcamp Reactjs</h1>
        <br />
        <div className="my-card">
          <div className="label my-card">Identity</div>
          <table>
            <tbody>
              <tr>
                <td>Nama</td>
                <td>:</td>
                <td>Qory Amanah Putra</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>:</td>
                <td>qoryamanahputra0708@gmail.com</td>
              </tr>
              <tr>
                <td>Sistem Operas yang digunakan</td>
                <td>:</td>
                <td>Windows 10 64-bit</td>
              </tr>
              <tr>
                <td>Akun Github</td>
                <td>:</td>
                <td>reader00</td>
              </tr>
              <tr>
                <td>Akun telegram</td>
                <td>:</td>
                <td>@r_eader</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
      </div>
    </section>
  );
};

export default About;
