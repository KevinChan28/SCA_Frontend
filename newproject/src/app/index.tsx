import { Styles } from "@/constants/theme";
import { getDocumentsList } from "@/services/documents";
import { getStatusList } from "@/services/status";
import { ImageBackground } from "expo-image";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState([]);

  const documentList = async (pageToLoad = 0) => {
    try {
      const data = await getDocumentsList(pageToLoad);
      if (data) {
        const items = Array.isArray(data.content) ? data.content : [];
        setDocuments(items);
        setFilteredDocuments(items);
        setCurrentPage(data.number ?? pageToLoad);
        setTotalPages(data.totalPages ?? 1);
      }
    } catch (error) {
      console.error("Error al cargar los documentos:", error);
    }
  };
  const statusList = async () => {
    try {
      const data = await getStatusList()
      console.log(data);
      setSelectedStatus(data)
    } catch (error) {
      console.error("Error al cargar los documentos:", error);
    }
  }
  useEffect(() => {
    documentList(0);
    statusList();
  }, []);
  useEffect(() => {
    let result = documents;

    // Filtro por estatus al hacer clic en los botones superiores
    if (selectedStatus !== "ALL") {
      result = result.filter(item => {
        if (selectedStatus === "Turnado") return item.statusName === "Turnado";
        if (selectedStatus === "Vencido") return item.statusName === "Vencido";
        return true;
      });
    }
    // Filtro por texto de búsqueda
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(item =>
        (item.folio && item.folio.toLowerCase().includes(term)) ||
        (item.sender && item.sender.toLowerCase().includes(term)) ||
        (item.subject && item.subject.toLowerCase().includes(term)) ||
        (item.assignedToName && item.assignedToName.toLowerCase().includes(term))
      );
    }

    setFilteredDocuments(result);
  }, [searchTerm, selectedStatus, documents]);

  const handleAnterior = () => {
    if (currentPage > 0) documentList(currentPage - 1);
  };

  const handleSiguiente = () => {
    if (currentPage + 1 < totalPages) documentList(currentPage + 1);
  };

  return (
    <ImageBackground
      source={require("@/assets/images/SCA/background3.jpeg")}
      style={Styles.backgroundImage}
      resizeMode="cover">
      <View style={Styles.container}>
        <View style={Styles.titleContainer}>
          <Text style={Styles.subtitle}>
            📋 Sistema de Control de Acuerdos
          </Text>
          <View style={Styles.titleStatus}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <button onClick={() => setSelectedStatus("ALL")} style={{ ...Styles.webButtonStatus, cursor: 'pointer' }}>
                {documents.length} <br /> Total
              </button>
              <button onClick={() => setSelectedStatus("Turnado")} style={{ ...Styles.webButtonStatus, cursor: 'pointer' }}>
                {documents.filter(d => d.statusName === "Turnado").length} <br /> Turnados
              </button>
              <button onClick={() => setSelectedStatus("Vencidos")} style={{ ...Styles.webButtonStatus, cursor: 'pointer' }}>
                {documents.filter(d => d.statusName === "Vencidos").length} <br /> Vencidos
              </button>
              <button onClick={() => setSelectedStatus("Recibidos")} style={{ ...Styles.webButtonStatus, cursor: 'pointer' }}>
                0 <br /> Recibidos hoy
              </button>
              <button onClick={() => setSelectedStatus("SinAsignar")} style={{ ...Styles.webButtonStatus, cursor: 'pointer' }}>
                0 <br /> Sin Asignar
              </button>
              <button onClick={() => setSelectedStatus("Firma")} style={{ ...Styles.webButtonStatus, cursor: 'pointer' }}>
                0 <br /> Listos para firmar
              </button>
            </div>
          </View>
          <View style={Styles.titleStatus}>
            <div>
              <input
                type="search"
                placeholder="Buscar folio, remitente, asunto…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', marginRight: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '280px' }} />
              <select style={Styles.webButtonStatus2}>
                {selectedStatus.map((item, index) => (
                  <option key={index} value={item}>
                    {item.Name}
                  </option>
                ))}
                {/* <option value="ab">Todos los estatus</option>
                <option value="Turnado">Turnado</option>
                <option value="En Elaboración">En Elaboración</option>
                <option value="En revisión">En revisión</option>
                <option value="Listo para Firma">Listo para Firma</option>
                <option value="Enviado / Concluido">Enviado / Concluido</option> */}
              </select>
              <button style={Styles.webButtonStatus2}>+ Nuevo asunto</button>
              <button style={Styles.webButtonStatus2}>📂 Importar carpeta</button>
              <button style={Styles.webButtonStatus2}>Exportar CSV</button>
            </div>
          </View>
          <div style={{ width: '100%', overflowX: 'auto', marginTop: '10px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'rgba(255,255,255,0.85)' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ccc' }}>
                  <th style={{ padding: '8px' }}>Folio</th>
                  <th style={{ padding: '8px' }}>Recibido</th>
                  <th style={{ padding: '8px' }}>Remitente / Asunto</th>
                  <th style={{ padding: '8px' }}>Responsable</th>
                  <th style={{ padding: '8px' }}>Límite</th>
                  <th style={{ padding: '8px' }}>Estatus</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredDocuments) && filteredDocuments.length > 0 ? (
                  filteredDocuments.map((item, index) => (
                    <tr key={index} style={{ borderBottom: '2px solid #ccc' }}>
                      <td style={{ padding: '8px' }}>{item.folio}</td>
                      <td style={{ padding: '8px' }}>{item.sender}</td>
                      <td style={{ padding: '8px' }}>{item.subject}</td>
                      <td style={{ padding: '8px' }}>{item.assignedToName}</td>
                      <td style={{ padding: '8px' }}>{item.limitDate ? item.limitDate : "-"}</td>
                      <td style={{ padding: '8px' }}>{item.statusName}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                      Sin asuntos para mostrar. Registra el primero con «+ Nuevo asunto».
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '15px', paddingBottom: '10px' }}>
              <button
                onClick={handleAnterior}
                disabled={currentPage === 0}
                style={{
                  ...Styles.webButtonStatus2,
                  opacity: currentPage === 0 ? 0.4 : 1,
                  cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                }}>
                Anterior
              </button>
              <span style={{ fontWeight: 'bold', color: '#333' }}>
                Página {currentPage + 1} de {totalPages}
              </span>
              <button
                onClick={handleSiguiente}
                disabled={currentPage + 1 >= totalPages}
                style={{
                  ...Styles.webButtonStatus2,
                  opacity: currentPage + 1 >= totalPages ? 0.4 : 1,
                  cursor: currentPage + 1 >= totalPages ? 'not-allowed' : 'pointer',
                }}>
                Siguiente
              </button>
            </div>
          </div>
        </View>
      </View>
    </ImageBackground>
  );
}