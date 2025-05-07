import { useState } from 'react';
import { useAdminData } from '../../contexts/AdminDataProvider';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type SubscriberStatus = 'active' | 'unsubscribed';

export default function Newsletter() {
  const { data, updateNewsletterSubscriber, deleteNewsletterSubscriber } = useAdminData();
  const [selectedStatus, setSelectedStatus] = useState<SubscriberStatus>('active');

  const handleStatusChange = async (id: string, status: SubscriberStatus) => {
    await updateNewsletterSubscriber(id, { status });
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (confirm('Are you sure you want to delete this subscriber?')) {
      await deleteNewsletterSubscriber(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Newsletter Subscribers</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Subscribed</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.newsletter.map((subscriber) => (
            <TableRow key={subscriber.id}>
              <TableCell>{subscriber.email}</TableCell>
              <TableCell>
                <Select
                  value={subscriber.status}
                  onValueChange={(value: SubscriberStatus) =>
                    handleStatusChange(subscriber.id, value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{new Date(subscriber.dateSubscribed).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteSubscriber(subscriber.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 