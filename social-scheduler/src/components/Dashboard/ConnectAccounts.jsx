import { useEffect, useState } from "react";
import ConnectAccountsLoading from "../LoadingComponents/ConnectAccountsLoading";

export default function ConnectedAccounts() {

    const [isLoading, setIsLoading] = useState(false);
    const [accounts, setAccounts] = useState([
      { icon: 'facebook-f', color: 'bg-blue-500', name: 'Facebook', status: 'Connected' },
      { icon: 'instagram', color: 'bg-gradient-to-br from-pink-500 to-yellow-500', name: 'Instagram', status: 'Connected' },
      { icon: 'twitter', color: 'bg-blue-400', name: 'Twitter', status: 'Connected' },
      { icon: 'youtube', color: 'bg-red-500', name: 'YouTube', status: 'Not Connected' },
      { icon: 'whatsapp', color: 'bg-green-500', name: 'WhatsApp', status: 'Not Connected' },
      { icon: 'plus', color: 'bg-gray-800', name: 'Add More', status: '' }
    ]);

    useEffect(() => {
      async function fetchConnectedAccounts(){
        setIsLoading(true);
        try {
          const response = await fetch('http://localhost:3000/ConnectedAccounts');

          if(!response.ok){
            throw new Error(`HTTP error! status ${response.status}`)
          }
          const data = response.json();
          setAccounts(data);
        } catch(error) {
          console.error('Error fetching connected Accounts: ',error)
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