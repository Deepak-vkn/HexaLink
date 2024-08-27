import AdminNav from '../../Components/admin/adminNav';
import Table from '../../Components/admin/table';
import { fetchUsers } from '../../api/admin/get'
import { blockUser } from '../../api/admin/post'; 
import React, { useState, useEffect } from 'react';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data); 
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleBlockUser = async (userId: string) => {
    try {
     const response= await blockUser(userId); 
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

  const headings = ['Profile', 'Name', 'Email', 'Join Date', 'Status', 'Action'];

  return (
    <div className="flex min-h-screen">
      <AdminNav title={'USERS'}/>
      <div className="flex-1 ml-64 p-2">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Table
            data={users}
            headings={headings}
            onBlockUser={handleBlockUser}
           
          />
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
