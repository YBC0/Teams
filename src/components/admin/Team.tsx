import { useState } from 'react';
import { useAdminData } from '../../contexts/AdminDataProvider';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export default function Team() {
  const { data, updateTeamMember, deleteTeamMember } = useAdminData();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const handleUpdateTeamMember = async () => {
    if (selectedMember) {
      await updateTeamMember(selectedMember);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteTeamMember = async (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      await deleteTeamMember(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Members</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.team.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.phone}</TableCell>
              <TableCell>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedMember(member);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteTeamMember(member.id)}
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
            <DialogTitle>Edit Team Member</DialogTitle>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={selectedMember.name}
                  onChange={(e) =>
                    setSelectedMember({ ...selectedMember, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-role">Role</Label>
                <Input
                  id="edit-role"
                  value={selectedMember.role}
                  onChange={(e) =>
                    setSelectedMember({ ...selectedMember, role: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedMember.email}
                  onChange={(e) =>
                    setSelectedMember({ ...selectedMember, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={selectedMember.phone}
                  onChange={(e) =>
                    setSelectedMember({ ...selectedMember, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-bio">Bio</Label>
                <Textarea
                  id="edit-bio"
                  value={selectedMember.bio}
                  onChange={(e) =>
                    setSelectedMember({ ...selectedMember, bio: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-imageUrl">Image URL</Label>
                <Input
                  id="edit-imageUrl"
                  value={selectedMember.imageUrl}
                  onChange={(e) =>
                    setSelectedMember({ ...selectedMember, imageUrl: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-linkedin">LinkedIn</Label>
                <Input
                  id="edit-linkedin"
                  value={selectedMember.socialLinks.linkedin}
                  onChange={(e) =>
                    setSelectedMember({
                      ...selectedMember,
                      socialLinks: { ...selectedMember.socialLinks, linkedin: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-twitter">Twitter</Label>
                <Input
                  id="edit-twitter"
                  value={selectedMember.socialLinks.twitter}
                  onChange={(e) =>
                    setSelectedMember({
                      ...selectedMember,
                      socialLinks: { ...selectedMember.socialLinks, twitter: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-facebook">Facebook</Label>
                <Input
                  id="edit-facebook"
                  value={selectedMember.socialLinks.facebook}
                  onChange={(e) =>
                    setSelectedMember({
                      ...selectedMember,
                      socialLinks: { ...selectedMember.socialLinks, facebook: e.target.value },
                    })
                  }
                />
              </div>
              <Button onClick={handleUpdateTeamMember}>Update Team Member</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 