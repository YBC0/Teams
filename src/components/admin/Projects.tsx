import { useState } from 'react';
import { useAdminData } from '../../contexts/AdminDataProvider';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

type ProjectStatus = 'planning' | 'in-progress' | 'completed';

export default function Projects() {
  const { data, createProject, updateProject, deleteProject } = useAdminData();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    location: '',
    status: 'planning' as ProjectStatus,
    startDate: '',
    endDate: '',
    imageUrl: '',
    impact: {
      wellsBuilt: 0,
      peopleHelped: 0,
    },
  });

  const handleCreateProject = async () => {
    await createProject({
      ...newProject,
      impact: {
        wellsBuilt: parseInt(newProject.impact.wellsBuilt.toString()),
        peopleHelped: parseInt(newProject.impact.peopleHelped.toString()),
      },
    });
    setIsCreateDialogOpen(false);
    setNewProject({
      title: '',
      description: '',
      location: '',
      status: 'planning' as ProjectStatus,
      startDate: '',
      endDate: '',
      imageUrl: '',
      impact: {
        wellsBuilt: 0,
        peopleHelped: 0,
      },
    });
  };

  const handleUpdateProject = async () => {
    if (selectedProject) {
      await updateProject(selectedProject.id, {
        ...selectedProject,
        impact: {
          wellsBuilt: parseInt(selectedProject.impact.wellsBuilt.toString()),
          peopleHelped: parseInt(selectedProject.impact.peopleHelped.toString()),
        },
      });
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newProject.location}
                  onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newProject.status}
                  onValueChange={(value: ProjectStatus) => setNewProject({ ...newProject, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newProject.startDate}
                  onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newProject.endDate}
                  onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={newProject.imageUrl}
                  onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="wellsBuilt">Wells Built</Label>
                <Input
                  id="wellsBuilt"
                  type="number"
                  value={newProject.impact.wellsBuilt}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      impact: { ...newProject.impact, wellsBuilt: parseInt(e.target.value) },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="peopleHelped">People Helped</Label>
                <Input
                  id="peopleHelped"
                  type="number"
                  value={newProject.impact.peopleHelped}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      impact: { ...newProject.impact, peopleHelped: parseInt(e.target.value) },
                    })
                  }
                />
              </div>
              <Button onClick={handleCreateProject}>Create Project</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Wells Built</TableHead>
            <TableHead>People Helped</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.location}</TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell>{new Date(project.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(project.endDate).toLocaleDateString()}</TableCell>
              <TableCell>{project.impact.wellsBuilt}</TableCell>
              <TableCell>{project.impact.peopleHelped}</TableCell>
              <TableCell>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedProject(project);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteProject(project.id)}
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
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={selectedProject.title}
                  onChange={(e) =>
                    setSelectedProject({ ...selectedProject, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedProject.description}
                  onChange={(e) =>
                    setSelectedProject({ ...selectedProject, description: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={selectedProject.location}
                  onChange={(e) =>
                    setSelectedProject({ ...selectedProject, location: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={selectedProject.status}
                  onValueChange={(value: ProjectStatus) =>
                    setSelectedProject({ ...selectedProject, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-startDate">Start Date</Label>
                <Input
                  id="edit-startDate"
                  type="date"
                  value={selectedProject.startDate}
                  onChange={(e) =>
                    setSelectedProject({ ...selectedProject, startDate: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-endDate">End Date</Label>
                <Input
                  id="edit-endDate"
                  type="date"
                  value={selectedProject.endDate}
                  onChange={(e) =>
                    setSelectedProject({ ...selectedProject, endDate: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-imageUrl">Image URL</Label>
                <Input
                  id="edit-imageUrl"
                  value={selectedProject.imageUrl}
                  onChange={(e) =>
                    setSelectedProject({ ...selectedProject, imageUrl: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-wellsBuilt">Wells Built</Label>
                <Input
                  id="edit-wellsBuilt"
                  type="number"
                  value={selectedProject.impact.wellsBuilt}
                  onChange={(e) =>
                    setSelectedProject({
                      ...selectedProject,
                      impact: {
                        ...selectedProject.impact,
                        wellsBuilt: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-peopleHelped">People Helped</Label>
                <Input
                  id="edit-peopleHelped"
                  type="number"
                  value={selectedProject.impact.peopleHelped}
                  onChange={(e) =>
                    setSelectedProject({
                      ...selectedProject,
                      impact: {
                        ...selectedProject.impact,
                        peopleHelped: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <Button onClick={handleUpdateProject}>Update Project</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 