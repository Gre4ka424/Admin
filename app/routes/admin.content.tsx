import { useEffect, useState } from 'react';

interface Content {
  id: number;
  key: string;
  value: string;
  updated_at: string;
}

export default function AdminContent() {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/admin/content`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch content');
      return res.json();
    })
    .then(data => {
      setContent(data);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  const handleEdit = (key: string, value: string) => {
    setEditingKey(key);
    setEditValue(value);
  };

  const handleSave = () => {
    if (!editingKey) return;

    const token = localStorage.getItem('token');
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/content/${editingKey}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: editValue })
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to update content');
      return res.json();
    })
    .then(updatedContent => {
      setContent(content.map(item => 
        item.key === editingKey ? updatedContent : item
      ));
      setEditingKey(null);
    })
    .catch(err => {
      setError(err.message);
    });
  };

  const handleDelete = (key: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return;

    const token = localStorage.getItem('token');
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/content/${key}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to delete content');
      setContent(content.filter(item => item.key !== key));
    })
    .catch(err => {
      setError(err.message);
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Site Content</h3>
      </div>
      <div className="border-t border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {content.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.key}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {editingKey === item.key ? (
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full h-32 p-2 border rounded"
                    />
                  ) : (
                    <div className="whitespace-pre-wrap">{item.value}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingKey === item.key ? (
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:text-green-900 mr-4"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(item.key, item.value)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item.key)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 