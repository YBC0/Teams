import { useState } from 'react';
import { useAdminData } from '../../contexts/AdminDataProvider';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type DonationStatus = 'pending' | 'completed' | 'failed';

export default function Donations() {
  const { data, createDonation, updateDonation, deleteDonation } = useAdminData();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [newDonation, setNewDonation] = useState({
    amount: '',
    name: '',
    email: '',
    donor: '',
    status: 'pending' as DonationStatus,
    projectId: '',
  });

  const handleCreateDonation = async () => {
    await createDonation({
      ...newDonation,
      amount: parseFloat(newDonation.amount),
      date: new Date().toISOString(),
    });
    setIsCreateDialogOpen(false);
    setNewDonation({
      amount: '',
      name: '',
      email: '',
      donor: '',
      status: 'pending' as DonationStatus,
      projectId: '',
    });
  };

  const handleUpdateDonation = async () => {
    if (selectedDonation) {
      await updateDonation(selectedDonation.id, {
        ...selectedDonation,
        amount: parseFloat(selectedDonation.amount),
      });
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteDonation = async (id: string) => {
    if (confirm('Are you sure you want to delete this donation?')) {
      await deleteDonation(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Donations</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Donation</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Donation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newDonation.amount}
                  onChange={(e) => setNewDonation({ ...newDonation, amount: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newDonation.name}
                  onChange={(e) => setNewDonation({ ...newDonation, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newDonation.email}
                  onChange={(e) => setNewDonation({ ...newDonation, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="donor">Donor</Label>
                <Input
                  id="donor"
                  value={newDonation.donor}
                  onChange={(e) => setNewDonation({ ...newDonation, donor: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newDonation.status}
                  onValueChange={(value: DonationStatus) => setNewDonation({ ...newDonation, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="projectId">Project ID (Optional)</Label>
                <Input
                  id="projectId"
                  value={newDonation.projectId}
                  onChange={(e) => setNewDonation({ ...newDonation, projectId: e.target.value })}
                />
              </div>
              <Button onClick={handleCreateDonation}>Create Donation</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Donor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Project ID</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.donations.map((donation) => (
            <TableRow key={donation.id}>
              <TableCell>{new Date(donation.date).toLocaleDateString()}</TableCell>
              <TableCell>${donation.amount}</TableCell>
              <TableCell>{donation.name}</TableCell>
              <TableCell>{donation.email}</TableCell>
              <TableCell>{donation.donor}</TableCell>
              <TableCell>{donation.status}</TableCell>
              <TableCell>{donation.projectId || '-'}</TableCell>
              <TableCell>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedDonation(donation);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteDonation(donation.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Donation</DialogTitle>
          </DialogHeader>
          {selectedDonation && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-amount">Amount</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  value={selectedDonation.amount}
                  onChange={(e) =>
                    setSelectedDonation({ ...selectedDonation, amount: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={selectedDonation.name}
                  onChange={(e) =>
                    setSelectedDonation({ ...selectedDonation, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedDonation.email}
                  onChange={(e) =>
                    setSelectedDonation({ ...selectedDonation, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-donor">Donor</Label>
                <Input
                  id="edit-donor"
                  value={selectedDonation.donor}
                  onChange={(e) =>
                    setSelectedDonation({ ...selectedDonation, donor: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={selectedDonation.status}
                  onValueChange={(value: DonationStatus) =>
                    setSelectedDonation({ ...selectedDonation, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-projectId">Project ID (Optional)</Label>
                <Input
                  id="edit-projectId"
                  value={selectedDonation.projectId || ''}
                  onChange={(e) =>
                    setSelectedDonation({ ...selectedDonation, projectId: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleUpdateDonation}>Update Donation</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 