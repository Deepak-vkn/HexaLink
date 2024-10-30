
import AdminNav from '../../Components/admin/adminNav';
import Table from '../../Components/admin/table';
import { fetchCompany } from '../../api/admin/get';
import { blockCompany } from '../../api/admin/post';
import React, { useState, useEffect } from 'react';




const adminCompany:React.FC = () => {
    const [users, setUsers] = useState<any[]>([]); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const getUsers = async () => {
          try {
            const response = await fetchCompany();
            setUsers(response.data); 
          } catch (err) {
            setError('Failed to fetch users');
          } finally {
            setLoading(false);
          }
        };
    
        getUsers();
      }, []);

      const handleBlockCompany = async (userId: string) => {
        try {
         const response= await blockCompany(userId); 
          if (response.success) {
            
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user._id === userId ? { ...user, is_block: response.block } : user
              )
            );
          } else {
    
            setError(response.data.message || 'Failed to block user');
          }
        } catch (err) {
    
          setError('Failed to block user');
        }
      };
      const headings = ['Profile', 'Name', 'Email', 'Join Date', 'Status','Action'];
    
  return (
    <div >
      <AdminNav title={'COMPANY'}/>
      <div className="flex-1">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Table data={users} headings={headings}  onBlockUser={handleBlockCompany}/>
        )}
      </div>
    </div>
  )
}

export default adminCompany
