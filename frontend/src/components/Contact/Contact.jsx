import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";

function Contact() {
  return (
    <>
      <NavBar />
      <h3>Kapcsolat</h3>
      <div className="informaciok">
        <p>Cím: 9024 Győr, Mária Terézia út 25/B </p>
        <p>Telefon: +36 10 100 1000</p>
        <p>E-mail: tabletopbar@tabletopbar.hu </p>
        <table>
          <thead>
            <tr>
              <th colSpan={2}>Nyitvatartás</th>
            </tr>
          </thead>
          <tr>
            <td>Hétfő</td>
            <td>15:00 - 22:00</td>
          </tr>
          <tr>
            <td>Kedd</td>
            <td>15:00 - 22:00</td>
          </tr>
          <tr>
            <td>Szerda</td>
            <td>15:00 - 01:00</td>
          </tr>
          <tr>
            <td>Csütörtök</td>
            <td>15:00 - 22:00</td>
          </tr>
          <tr>
            <td>Péntek</td>
            <td>15:00 - 02:00</td>
          </tr>
          <tr>
            <td>Szombat</td>
            <td>15:00 - 02:00</td>
          </tr>
          <tr>
            <td>Vasárnap</td>
            <td>15:00 - 00:00</td>
          </tr>
        </table>
      </div>
      <div className="uzenet">
        <form action="#">
          <fieldset>
            <h3>Írj nekünk!</h3>
            <label htmlFor="cvnev">Vezetéknév </label>
            <input
              type="text"
              id="cvnev"
              name="cvnev"
              required
              placeholder="Varga"
            />
            <label htmlFor="cknev">Keresztnév </label>
            <input
              type="text"
              id="cknev"
              name="cknev"
              required
              placeholder="Károly"
            />
            <label htmlFor="cemail">Email cím </label>
            <input
              type="email"
              id="cemail"
              name="cemail"
              required
              placeholder="valami@email.com"
            />
            <label htmlFor="ctext">Üzenet </label>
            <textarea
              name="ctext"
              id="ctext"
              required
              placeholder="Üzenj nekünk valamit!"
              maxLength={350}
              rows={15}
              cols={30}
            ></textarea>
            <button id="csendform" type="submit">
              Küldés
            </button>
          </fieldset>
        </form>
      </div>
      <Footer />
    </>
  );
}
export default Contact;
