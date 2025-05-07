import { useState } from 'react';
import { useAdminData } from '../../contexts/AdminDataProvider';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export default function Partners() {
  const { data, updatePartner, deletePartner } = useAdminData();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);

  const handleUpdatePartner = async () => {
    if (selectedPartner) {
      await updatePartner(selectedPartner.id, selectedPartner);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeletePartner = async (id: string) => {
    if (confirm('Are you sure you want to delete this partner?')) {
      await deletePartner(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Partners</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.partners.map((partner) => (
            <TableRow key={partner.id}>
              <TableCell>{partner.name}</TableCell>
              <TableCell>{partner.type}</TableCell>
              <TableCell>
                <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {partner.website}
                </a>
              </TableCell>
              <TableCell>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPartner(partner);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeletePartner(partner.id)}
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
            <DialogTitle>Edit Partner</DialogTitle>
          </DialogHeader>
          {selectedPartner && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={selectedPartner.name}
                  onChange={(e) =>
                    setSelectedPartner({ ...selectedPartner, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-type">Type</Label>
                <Input
                  id="edit-type"
                  value={selectedPartner.type}
                  onChange={(e) =>
                    setSelectedPartner({ ...selectedPartner, type: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-logo">Logo URL</Label>
                <Input
                  id="edit-logo"
                  value={selectedPartner.logo}
                  onChange={(e) =>
                    setSelectedPartner({ ...selectedPartner, logo: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-website">Website</Label>
                <Input
                  id="edit-website"
                  value={selectedPartner.website}
                  onChange={(e) =>
                    setSelectedPartner({ ...selectedPartner, website: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedPartner.description}
                  onChange={(e) =>
                    setSelectedPartner({ ...selectedPartner, description: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleUpdatePartner}>Update Partner</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 