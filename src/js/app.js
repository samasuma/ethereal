document.addEventListener('DOMContentLoaded', function () {
    const ethereumButton = document.getElementById('connectWallet');
    const status = document.getElementById('status');

    ethereumButton.addEventListener('click', () => {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            // Request account access
            window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(result => {
                accountChangedHandler(result[0]);
            })
            .catch(error => {
                // Handle errors like user rejection
                if (error.code === 4001) { // EIP-1193 user rejection error code
                    status.textContent = 'User denied account access';
                } else {
                    status.textContent = `Error: ${error.message}`;
                }
            });
        } else {
            status.textContent = "Please install MetaMask!";
        }
    });

    function accountChangedHandler(account) {
        status.textContent = `Wallet connected: ${account}`;
    }
});
