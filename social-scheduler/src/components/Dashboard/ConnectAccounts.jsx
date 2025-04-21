import { useEffect, useState } from "react";
import ConnectAccountsLoading from "../LoadingComponents/ConnectAccountsLoading";
import axios from 'axios';
export default function ConnectedAccounts() {

    const [isLoading, setIsLoading] = useState(false);
    const [accounts, setAccounts] = useState([
      { icon: 'facebook-f', color: 'bg-blue-500', name: 'Facebook', status: 'Connected' },
      { icon: 'instagram', color: 'bg-gradient-to-br from-pink-500 to-yellow-500', name: 'Instagram', status: 'Connected' },
      { icon: 'twitter', color: 'bg-blue-400', name: 'Twitter', status: 'Connected' },
      { icon: 'youtube', color: 'bg-red-500', name: 'YouTube', status: 'Not Connected' },
      { icon: 'linkedin-in', color: 'bg-blue-800', name: 'LinkedIn', status: 'Connected' },
      { icon: 'whatsapp', color: 'bg-green-500', name: 'WhatsApp', status: 'Not Connected' },
      { icon: 'plus', color: 'bg-gray-800', name: 'Add More', status: '' }
    ]);

    useEffect(() => {

async function fetchConnectedAccounts() {
  setIsLoading(true);
  try {
    const response = await axios.get(
      'http://localhost:3000/api/accounts/connected', // Correct endpoint
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    setAccounts(response.data);
  } catch (error) {
    console.error('Error fetching connected accounts:', error);
    if (error.response) {
      console.error('Server responded with:', error.response.status);
    }
  } finally {
    setIsLoading(false);
  }
}

      fetchConnectedAccounts();
    },[])
  
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <i className="fas fa-link mr-3"></i> Connected Accounts
        </h2>
        <div className="flex flex-wrap gap-8 justify-center">
          {isLoading ? (
            <ConnectAccountsLoading />
          ) : (
            accounts.map((account, index) => (
              <div className="text-center" key={index}>
                <div className={`social-circle ${account.color} text-white`}>
                  <i className={`fab fa-${account.icon} text-3xl mb-2`}></i>
                  <span>{account.name}</span>
                </div>
                {account.status && <span className="text-sm font-bold mt-1">{account.status}</span>}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }