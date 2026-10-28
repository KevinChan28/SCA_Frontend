import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>📋 Sistema de Control de Acuerdos</h1>
      <div class="sub" id="hoy"></div>
      <div class="stats" id="stats"></div>
      <div class="bar">
        <input type="search" id="q" placeholder="Buscar folio, remitente, asunto…" />
        <select id="fe"></select>
        <select id="fr">
          <option value="">Todos los responsables</option>
        </select>
        <button class="p" id="nuevo">+ Nuevo asunto</button>
        <button id="imp">📂 Importar carpeta</button><input type="file" id="dir" webkitdirectory multiple hidden />
        <button id="csv">Exportar CSV</button>
        <button id="resp">Respaldo</button>
        <button id="rest">Restaurar</button>
        <input type="file" id="file" accept=".json" hidden />
      </div>
      <div class="sub" id="prog" /*style="margin-bottom:8px"*/></div>
      <div class="tw">
        <table>
          <thead>
            <tr>
              <th>Folio</th>
              <th>Recibido</th>
              <th>Remitente / Asunto</th>
              <th>Responsable</th>
              <th>Límite</th>
              <th>Estatus</th>
            </tr>
          </thead>
          <tbody id="tb"></tbody>
        </table>
      </div>
      <p class="sub">Los datos se guardan en este navegador. Usa «Respaldo» con frecuencia para no perderlos.</p>
      <div class="dg">
        <dialog id="dg">
          <form method="dialog" id="fm">
            <div class="fg">
              <label>Folio / No. de oficio<input id="folio" required /></label>
              <label>Tipo<select id="tipo">
                <option>Oficio</option>
                <option>Memorándum</option>
                <option>Correo</option>
                <option>Otro</option>
              </select></label>
              <label>Fecha de recepción<input type="date" id="fecha" required /></label>
              <label>Fecha límite de respuesta<input type="date" id="limite" /></label>
              <label class="w">Remitente (área o persona)<input id="rem" /></label>
              <label class="w">Asunto<textarea id="asu" rows="2" required></textarea></label>
              <label>Responsable asignado<input id="res" list="dl" /></label>
              <datalist id="dl"></datalist>
              <label>Estatus<select id="est"></select></label>
              <label class="w">Notas / observaciones de revisión<textarea id="nota" rows="3"></textarea></label>
            </div>
            <div class="sub" id="hist" /*style="margin-top:8px"*/></div>
            <div class="act"><button type="button" id="del" class="rd">Eliminar</button><span><button type="button"
              id="cx">Cancelar</button> <button class="p" id="ok" type="submit">Guardar</button></span></div>
          </form>
        </dialog>
      </div>
    </div>

  );
}

export default App;
