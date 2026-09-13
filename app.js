// Register Service Worker untuk sokongan PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker Berjaya Didaftar'))
    .catch(err => console.error('Pendaftaran SW Gagal:', err));
}

// Gantikan dengan URL Backend / Serverless Relay anda (Vercel/Render/dsb.)
const BACKEND_API_URL = 'https://backend-demo-anda.vercel.app/api/topup';

document.getElementById('topupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const phone = document.getElementById('phone').value;
  const provider = document.getElementById('provider').value;
  const amount = document.getElementById('amount').value;
  
  const submitBtn = document.getElementById('submitBtn');
  const statusDiv = document.getElementById('status');

  submitBtn.disabled = true;
  submitBtn.innerText = 'Memproses...';
  statusDiv.style.display = 'none';

  try {
    // Menghantar data ke backend relay
    const response = await fetch(BACKEND_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, provider, amount })
    });

    const data = await response.json();

    if (response.ok && data.status === 'SUCCESS') {
      statusDiv.className = 'success';
      statusDiv.innerText = `Topup Berjaya! Transaksi ID: ${data.trx_id || 'DEMO123'}`;
    } else {
      throw new Error(data.message || 'Transaksi gagal diproses.');
    }
  } catch (error) {
    statusDiv.className = 'error';
    statusDiv.innerText = error.message;
  } finally {
    statusDiv.style.display = 'block';
    submitBtn.disabled = false;
    submitBtn.innerText = 'Hantar Pesanan';
  }
});
