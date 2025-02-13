import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MedicineType } from '../types/type';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import DokterSelect from '../components/DokterSelect';
import MedicineSelect from '../components/MedicineSelect';
import RuleSelect from '../components/RuleSelect';
import { formatDateTime } from '../helpers/formatDateTime';
import { saveResep } from '../actions/saveResepAction';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMedicine, setSelectedMedicine] = useState<MedicineType | null>(null);
  const [kekuatan1, setKekuatan1] = useState('');
  const [dosisRacik, setDosisRacik] = useState('');
  const [satuanKekuatan, setSatuanKekuatan] = useState('');
  const [admintime, setAdminTime] = useState('');
  const [jam0, setJam0] = useState(null);
  const [ap, setAp] = useState('')
  const [timing, setTiming] = useState('')
  const [aturanpakai2, setAturanpakai2] = useState('')
  const [medicineName, setMedicineName] = useState('')
  const dispatch = useDispatch();
  const [currentNoR, setCurrentNoR] = useState(1);

  const [formValues, setFormValues] = useState({
    // id: 190190,
    id_pk: 168041,
    pasien: '00059605',
    dokter: '000820',
    tanggal_resep: new Date(),
    jenis_resep: 'Non Racikan',
    no_r1: currentNoR.toString(),
    jt1: '',
    ap1: '1dd1',
    ap21: '1 x sehari 1 tablet',
    it1: 0,
    ja1: null,
    cara_buat1: null,
    timing1: 'Sesudah',
    jmlnor: 1,
    waktu_pemberian1: 'Pagi: 06:00',
    jp1: '',
    exp_racik1: '',
    id_barang: '',
    namaObat: '',
    // id_barang1[]: 2465,
    // kekuatan1[]: 1,
    // dosisracik1[]: 1,
    // obatkronis1[]: 1,
    // jmlpakai1[]: 7,
    // jmldetail1: 1,
    // margin_option: 'Layanan',
    kekuatan1: '',
    dosisracik: '',
    obatkronis1: 0,
    permintaan: '',
    jml_tebus: '',
    jumlah: '',
    aturanpakai: '',
    aturanPakai: '',
    admintime: '',
    jam0: '06:00',
    aturanpakai2: '',
    timing: ''
  });

  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMedicineChange = (selectedMedicine: any) => {
    console.log('selectedMedicine: ', selectedMedicine);
    
    setSelectedMedicine(selectedMedicine);
    
    if (selectedMedicine) {
      setKekuatan1(selectedMedicine.kekuatan);
      setSatuanKekuatan(selectedMedicine.satuan_kekuatan);
      setDosisRacik(selectedMedicine.kekuatan);
      setMedicineName(selectedMedicine.nama)
      setFormValues({
        ...formValues,
        namaObat: selectedMedicine.nama,
        id_barang: selectedMedicine.id,
        kekuatan1: selectedMedicine.kekuatan,
        dosisracik: selectedMedicine.kekuatan,
      });
    } else {
      setKekuatan1('');
      setSatuanKekuatan('');
      setDosisRacik('');
      setMedicineName('');

      setFormValues({
        ...formValues,
        id_barang: '',
        kekuatan1: '',
        dosisracik: '',
      });
    }

    console.log(formValues);
  };
  
  const handleRuleChange = (selectedRule: any) => {
    console.log('selectedRule ', selectedRule)
    if (selectedRule) {
      setAp(selectedRule.signa)
      setAdminTime('pagi')
      setTiming('sebelum')
      setAturanpakai2(selectedRule.keterangan)
      setJam0('06:00')
      setFormValues({
        ...formValues,
        admintime: 'pagi',
        jam0: '06:00',
        waktu_pemberian1: 'pagi: 06:00'
      });
    } else {
      setKekuatan1('');
      setSatuanKekuatan('');
      setJam0('')
      setFormValues({
        ...formValues,
        admintime: '',
        jam0: '',
        waktu_pemberian1: ''
      });
    }
  };

  const handleDokterChange = (selectedDokter: any) => {
    console.log('selectedDokter ', selectedDokter)
  };

  const handleAdminTimeSelect = (e: any) => {
    const newAdminTime = e.target.value;
    setAdminTime(newAdminTime);
    setFormValues({ ...formValues, admintime: newAdminTime });
  };

  const handleTimingSelect = (e: any) => {
    setTiming(e.target.value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormValues = { ...formValues, [name]: value };

    if (name === 'permintaan') {
      updatedFormValues['jt1'] = value;
      updatedFormValues['jp1'] = value;
    }

    if (name === 'jam0') {
      updatedFormValues['waktu_pemberian1'] = `${admintime}: ${value}`;
    }

    setFormValues(updatedFormValues);
  };

  const handleDateChange = (date: Date) => {
    setFormValues({ ...formValues, tanggal_resep: date });
  };

  const handleClearDate = () => {
    setFormValues({ ...formValues, tanggal_resep: Date | null });
  };

  const handleClearTime = () => {
    let timeInput = document.getElementById('jam0');
    timeInput.value = ''; // Clear the time input field
  }


  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmittedData([...submittedData, formValues]);
    setCurrentNoR(currentNoR + 1);
    setFormValues({
      ...formValues,
      no_r1: (currentNoR + 1).toString()
    });

    console.log('Form Values:', formValues);
  };

  const handleSave = (e : any) => {
    e.preventDefault();
    dispatch(saveResep(formValues));
  }

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
        <p className="pt-2 pb-4">No. Telp &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 089600002222</p>
        <div className="space-y-4">
          <p className="flex items-center">
            <span>Untuk Pasien&nbsp;: 00059605 / SLAMET URIP TN   / Poliklinik /</span>
          </p>
          <p className="flex items-center">
            <span>Usia&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 104 Tahun 9 Bulan 12 hari</span>
          </p>
          <p className="flex items-center">
            <span>Berat Badan&nbsp;&nbsp;: 71 Kg</span>
          </p>
          <p className="flex items-center">
            <span className="text-red-600 md:text-red-600">Ket&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ***</span>
          </p>
        </div>
      </div>
      
      <div className="col-span-1 md:col-span-2 bg-blue-100 text-black p-4">
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="col-span-1">
            <div className="mb-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-green-400 border border-green-400">
                Pilih Dokter
              </span>
            </div>
            <DokterSelect onSelectChange={handleDokterChange} className="w-full text-xs" />
          </div>
          <div className="col-span-1 text-right">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
              <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
              </svg>
              Waktu sekarang: {currentTime.toLocaleString()}
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
              htmlFor="no_r1">
                No. R/
              </label>
              <input
                name="no_r1"
                className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-full"
                id="no_r1"
                type="text"
                value={formValues.no_r1}
                onChange={handleInputChange} />
            </div>
            <div className="flex flex-col md:flex-row items-center mt-2">
              <label
              className="text-gray-700 text-sm font-bold w-full md:w-32 mb-1 md:mb-0 md:mr-2"
              htmlFor="nama">
                Obat
              </label>
              <MedicineSelect onSelectChange={handleMedicineChange} className="w-full text-xs" />
            </div>

            <div className="flex flex-col md:flex-row items-center mt-2">
              <label
              className="text-gray-700 text-sm font-bold w-full md:w-32 mb-1 md:mb-0 md:mr-2"
              htmlFor="kekuatan1">
                Kekuatan
              </label>
              <input
                  name="kekuatan1"
                  className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-full text-left"
                  id="kekuatan1"
                  type="text"
                  value={kekuatan1}
                  onChange={handleInputChange}
                />
            </div>
            <div className="flex flex-col md:flex-row items-center mt-2">
              <label
              className="text-gray-700 text-sm font-bold w-full md:w-32 mb-1 md:mb-0 md:mr-2"
              htmlFor="dosisracik">
                Dosis Racik
              </label>
              <div className="flex items-center w-full">
              <input
                name="dosisracik"
                className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-full"
                id="dosisracik"
                type="text"
                value={dosisRacik}
                onChange={handleInputChange} />
                <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset ml-2">
                  {satuanKekuatan}
                </span>
              </div>
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
                onChange={handleInputChange}
                value={formValues.jt1} />
            </div>
            <div className="flex flex-col md:flex-row items-center mt-2">
              <label
              className="text-gray-700 text-sm font-bold w-full md:w-32 mb-1 md:mb-0 md:mr-2"
              htmlFor="jumlah">
                Jumlah Pakai
              </label>
              <input
                name="jp1"
                className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-full"
                id="jumlah"
                type="text"
                onChange={handleInputChange}
                readOnly
                value={formValues.jp1} />
            </div>
          </div>

          <div className="col-span-1">
            <div className="flex flex-col md:flex-row items-center mt-2">
              <label
              className="text-gray-700 text-sm font-bold w-full md:w-32 mb-1 md:mb-0 md:mr-2"
              htmlFor="aturanPakai">
                Aturan Pakai
              </label>
              <RuleSelect onSelectChange={handleRuleChange} id_medicine={selectedMedicine} className="w-full text-xs" />
              {/* <input
                className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-full"
                id="aturanPakai"
                type="text" /> */}
            </div>

            <div className="flex flex-col md:flex-row items-center mt-2">
              <label
              className="text-gray-700 text-sm font-bold w-full md:w-32 mb-1 md:mb-0 md:mr-2"
              htmlFor="waktuPemberian">
                Waktu Pemberian
              </label>
              <div className="flex items-center w-full">
              <select
                value={admintime}
                onChange={handleAdminTimeSelect}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-8 w-1/3 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2">
                  <option selected>Pilih</option>
                  <option value="pagi">Pagi</option>
                  <option value="siang">Siang</option>
                  <option value="sore">Sore</option>
                  <option value="malam">Malam</option>
                </select>
                <input
                  name="jam0"
                  className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-1/3 mr-2"
                  id="jam0"
                  type="time"
                  value={formValues.jam0 || ''}
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
                  name="ap"
                  className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-1/3 mr-2"
                  id="aturanpakai"
                  type="text"
                  value={ap}
                  onChange={handleInputChange} />
                <select
                  value={timing}
                  onChange={handleTimingSelect}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-8 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2">
                    <option selected>Pilih</option>
                    <option value="sebelum">Sebelum makan</option>
                    <option value="sesudah">Sesudah makan</option>
                    <option value="saat">Saat makan</option>
                  </select>


                {/* <input
                  name="timing"
                  className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs w-1/2"
                  id="timing"
                  type="text"
                  value={timing}
                  onChange={handleInputChange} /> */}
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center mt-2">
              <textarea
                name="ap21"
                // rows="3"
                className="block w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100"
                id="ap21"
                value={aturanpakai2}
                onChange={handleInputChange}
                readOnly
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
        <h2 className="text-xl font-bold mb-2"></h2>
        <table className="table-auto w-full text-left">
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index}>
                <td>{data.no_r1}</td>
                {/* <td>{data.tanggal_resep ? data.tanggal_resep.toLocaleString() : ''}</td> */}
                <td>{data.jt1}</td>
                <td>{data.ap1}</td>
                <td>{data.waktu_pemberian1}</td>
                <td>Dosis: {data.kekuatan1}</td>
                <td>{data.namaObat}</td>
                <td>{data.jp1}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
           className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
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