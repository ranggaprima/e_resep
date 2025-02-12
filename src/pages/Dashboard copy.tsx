import { useState } from 'react';
import CustomSelect from '../components/MedicineSelect';
import { OptionType } from '../types/obatType';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const Dashboard = () => {
  const [selectedMedicine, setSelectedMedicine] = useState<OptionType | null>(null);
  const [currentNoR, setCurrentNoR] = useState(1);
  const [formValues, setFormValues] = useState({
    id: 190190,
    id_pk: 168041,
    pasien: '00059605',
    dokter: '000806',
    tanggal_resep: new Date(),
    jenis_resep: 'Non Racikan',
    no_r: currentNoR.toString(),
    obat: '',
    kekuatan: '',
    dosisracik: '',
    permintaan: '',
    jml_tebus: '',
    jumlah: '',
    aturanpakai: '',
    aturanPakai: '',
    admintime: '',
    jam0: '',
    aturanpakai2: '',
    timing: ''
  });

  const [submittedData, setSubmittedData] = useState([]);

  const handleMedicineChange = (selectedOption: OptionType | null) => {
    setSelectedMedicine(selectedOption);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormValues = { ...formValues, [name]: value };

    if (name === 'permintaan') {
      updatedFormValues['jml_tebus'] = value;
      updatedFormValues['jumlah'] = value;
    }

    setFormValues(updatedFormValues);
  };

  const handleDateChange = (date) => {
    setFormValues({ ...formValues, tanggal_resep: date });
  };

  const handleClearDate = () => {
    setFormValues({ ...formValues, tanggal_resep: null });
  };

  const handleClearTime = () => {
    const timeInput = document.getElementById('jam0');
    timeInput.value = ''; // Clear the time input field
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add formValues to submittedData
    setSubmittedData([...submittedData, formValues]);

    // Update the current No. R/ value
    setCurrentNoR(currentNoR + 1);

    // Reset the formValues with the updated No. R/ value
    setFormValues({
      ...formValues,
      no_r: (currentNoR + 1).toString()
    });

    console.log('Form Values:', formValues);
    // Process the form values as needed
  };

return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="bg-black/5 p-4">
      <div className="bg-yellow-200 text-black p-2 mb-2">
          <h2 className="text-sm font-bold mb-2">
            Info! Pasien terakhir mendapatkan resep 6 hari yang lalu pada tanggal 05 Februari 2025. Klik disini untuk melihat
          </h2>
        </div>


        <h1 className="text-1xl font-bold">No. RM, Nama: 00059605, SLAMET URIP TN,</h1>
        <p className="pt-2 pb-4">No. Telp: 089600002222</p>
        <div className="space-y-4">
          <p className="flex items-center">
            <span>Untuk Pasien: 00059605 / SLAMET URIP TN   / Poliklinik /</span>
          </p>
          <p className="flex items-center">
            <span>Usia: 104 Tahun 9 Bulan 12 hari</span>
          </p>
          <p className="flex items-center">
            <span>Berat Badan: 71 Kg</span>
          </p>
        </div>
      </div>
      
      <div className="col-span-1 md:col-span-2 bg-blue-100 text-black p-4">
        <h2 className="text-xl font-bold mb-2">Form</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
          <div className="flex flex-col md:flex-row items-center">
              <label 
              className="text-gray-700 text-sm font-bold w-full md:w-32 mb-1 md:mb-0 md:mr-2"
              htmlFor="tanggal_resep">
                Tanggal Resep
              </label>
              <div className="flex items-center w-full">
                <DatePicker
                  selected={formValues.tanggal_resep}
                  onChange={handleDateChange}
                  showTimeSelect
                  dateFormat="dd/MM/yyyy HH:mm:ss"
                  className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-full"
                />
                <button
                  type="button"
                  className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
                  onClick={handleClearDate}
                >
                  Manual Date
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center mt-2">
              <label
              className="text-gray-700 text-sm font-bold w-full md:w-32 mb-1 md:mb-0 md:mr-2"
              htmlFor="no_r">
                No. R/
              </label>
              <input
                name="no_r"
                className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-full"
                id="no_r"
                type="text"
                value={formValues.no_r}
                onChange={handleInputChange} />
            </div>
            <div className="flex flex-col md:flex-row items-center mt-2">
              <label
              className="text-gray-700 text-sm font-bold w-full md:w-32 mb-1 md:mb-0 md:mr-2"
              htmlFor="nama">
                Obat
              </label>
              <CustomSelect
                  id="obat"
                  placeholder="Pilih Obat..."
                  onChange={handleMedicineChange}
                />
            </div>
            <div className="flex flex-col md:flex-row items-center mt-2">
              <label
              className="text-gray-700 text-sm font-bold w-full md:w-32 mb-1 md:mb-0 md:mr-2"
              htmlFor="kekuatan">
                Kekuatan
              </label>
              <input
                name="kekuatan"
                className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-full"
                id="kekuatan"
                type="text"
                onChange={handleInputChange} />
            </div>
            <div className="flex flex-col md:flex-row items-center mt-2">
              <label
              className="text-gray-700 text-sm font-bold w-full md:w-32 mb-1 md:mb-0 md:mr-2"
              htmlFor="dosisracik">
                Dosis Racik
              </label>
              <input
                name="dosisracik"
                className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-full"
                id="dosisracik"
                type="text"
                onChange={handleInputChange} />
            </div>
            <div className="flex flex-col md:flex-row items-center mt-2">
              <label
              className="text-gray-700 text-sm font-bold w-full md:w-32 mb-1 md:mb-0 md:mr-2"
              htmlFor="permintaan">
                Permintaan
              </label>
              <input
                name="permintaan"
                className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-full"
                id="permintaan"
                type="number"
                onChange={handleInputChange} />
            </div>
            <div className="flex flex-col md:flex-row items-center mt-2">
              <label
              className="text-gray-700 text-sm font-bold w-full md:w-32 mb-1 md:mb-0 md:mr-2"
              htmlFor="jt1">
                Jumlah Tebus
              </label>
              <input
                name="jt1"
                className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-full"
                id="jml_tebus"
                type="text"
                readOnly
                value={formValues.jml_tebus} />
            </div>
            <div className="flex flex-col md:flex-row items-center mt-2">
              <label
              className="text-gray-700 text-sm font-bold w-full md:w-32 mb-1 md:mb-0 md:mr-2"
              htmlFor="jumlah">
                Jumlah Pakai
              </label>
              <input
                name="jumlah"
                className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-full"
                id="jumlah"
                type="text"
                readOnly
                value={formValues.jumlah} />
            </div>
          </div>

          <div className="col-span-1">
            <div className="flex flex-col md:flex-row items-center mt-2">
              <label
              className="text-gray-700 text-sm font-bold w-full md:w-32 mb-1 md:mb-0 md:mr-2"
              htmlFor="aturanPakai">
                Aturan Pakai
              </label>
              <input
                className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-full"
                id="aturanPakai"
                type="text" />
            </div>

            <div className="flex flex-col md:flex-row items-center mt-2">
              <label
              className="text-gray-700 text-sm font-bold w-full md:w-32 mb-1 md:mb-0 md:mr-2"
              htmlFor="waktuPemberian">
                Waktu Pemberian
              </label>
              <div className="flex items-center w-full">
                <input
                  className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-1/3 mr-2"
                  id="admintime"
                  type="text" />
                <input
                  name="jam0"
                  className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-1/3 mr-2"
                  id="jam0"
                  type="time"
                  onChange={handleInputChange} />
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded inline-flex items-center"
                  type="button"
                  onClick={handleClearTime}>
                  Refresh
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center mt-2">
              <label
              className="text-gray-700 text-sm font-bold w-full md:w-32 mb-1 md:mb-0 md:mr-2"
              htmlFor="aturanPakaiDetail">
                Aturan Pakai
              </label>
              <div className="flex items-center w-full">
                <input
                  name="ap1"
                  className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-1/2 mr-2"
                  id="aturanpakai"
                  type="text"
                  onChange={handleInputChange} />
                <input
                  name="timing"
                  className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-1/2"
                  id="timing"
                  type="text"
                  onChange={handleInputChange} />
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center mt-2">
              <textarea
                name="aturanpakai2"
                // rows="3"
                className="block w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100"
                id="aturanpakai2"
                onChange={handleInputChange}
                ></textarea>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
              Tambahkan
            </button>
          </div>
        </form>
      </div>
    </div>
    
    {submittedData && submittedData.length > 0 && (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="col-span-1 md:col-span-3 mt-4">
        <div className="bg-gray-300 h-2"></div>
      </div>
      <div className="col-span-1 md:col-span-3 bg-white text-black p-4">
        <h2 className="text-xl font-bold mb-2">Submitted Data</h2>
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th>No. R/</th>
              <th>Tanggal Resep</th>
              <th>Obat</th>
              <th>Dosis Racik</th>
              <th>Permintaan</th>
              <th>Jumlah</th>
              <th>Aturan Pakai</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index}>
                <td>{data.no_r}</td>
                <td>{data.tanggal_resep ? data.tanggal_resep.toLocaleString() : ''}</td>
                <td>{data.obat}</td>
                <td>{data.dosisracik}</td>
                <td>{data.permintaan}</td>
                <td>{data.jumlah}</td>
                <td>{data.aturanpakai2}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Simpan
          </button>
        </div>
      </div>
    </div>
    )}



    </>
  );
}

export default Dashboard;