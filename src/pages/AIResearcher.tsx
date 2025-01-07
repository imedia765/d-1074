import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Database, Search, Code, GitBranch, Link, File, Image, Plus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useProject } from '@/contexts/ProjectContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AIResearcher = () => {
  const { toast } = useToast();
  const { selectedProject } = useProject();
  const [newLink, setNewLink] = useState('');

  const projectTools = {
    'current': [
      { name: 'Code Analysis', progress: 85, description: 'Analyzing code patterns and structure' },
      { name: 'Data Mining', progress: 70, description: 'Extracting valuable insights from project data' },
      { name: 'Dependency Scanner', progress: 90, description: 'Scanning and analyzing project dependencies' }
    ],
    'project-1': [
      { name: 'API Analysis', progress: 95, description: 'Analyzing REST API patterns' },
      { name: 'State Management', progress: 80, description: 'Analyzing state management patterns' },
      { name: 'UI Components', progress: 75, description: 'Analyzing component structure' }
    ],
    'project-2': [
      { name: 'Database Schema', progress: 88, description: 'Analyzing data models' },
      { name: 'Auth Patterns', progress: 92, description: 'Analyzing authentication flows' },
      { name: 'Content Management', progress: 85, description: 'Analyzing CMS patterns' }
    ]
  };

  const projectDatasets = {
    'current': [
      { name: 'Code Patterns', size: '2.5GB', lastUpdated: '2 hours ago', type: 'patterns' },
      { name: 'Best Practices', size: '1.8GB', lastUpdated: '1 day ago', type: 'practices' },
      { name: 'Documentation', size: '3.2GB', lastUpdated: '5 hours ago', type: 'docs' }
    ],
    'project-1': [
      { name: 'E-commerce Patterns', size: '3.1GB', lastUpdated: '1 hour ago', type: 'patterns' },
      { name: 'Payment Integration', size: '2.2GB', lastUpdated: '3 hours ago', type: 'integration' },
      { name: 'User Flows', size: '1.9GB', lastUpdated: '2 days ago', type: 'flows' }
    ],
    'project-2': [
      { name: 'Blog Templates', size: '2.8GB', lastUpdated: '4 hours ago', type: 'templates' },
      { name: 'SEO Patterns', size: '1.5GB', lastUpdated: '1 day ago', type: 'seo' },
      { name: 'Content Types', size: '2.1GB', lastUpdated: '6 hours ago', type: 'content' }
    ]
  };

  const handleAnalyze = () => {
    toast({
      title: "Analysis Started",
      description: `AI is analyzing ${selectedProject.name}'s codebase...`,
    });
  };

  const handleAddResource = (type: string) => {
    toast({
      title: "Resource Added",
      description: `New ${type} added to ${selectedProject.name}'s knowledge base`,
    });
    setNewLink('');
  };

  const currentTools = projectTools[selectedProject.id as keyof typeof projectTools] || projectTools.current;
  const currentDatasets = projectDatasets[selectedProject.id as keyof typeof projectDatasets] || projectDatasets.current;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          AI Research Tools - {selectedProject.name}
        </h1>
        <div className="flex items-center gap-4">
          <Button onClick={handleAnalyze} className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Analyze Project
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Active Analysis Tools</h2>
          </div>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {currentTools.map((tool, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{tool.name}</span>
                    <span className="text-sm text-muted-foreground">{tool.progress}%</span>
                  </div>
                  <Progress value={tool.progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Project Knowledge Base</h2>
          </div>
          <Tabs defaultValue="links" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="links">Web Links</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
            </TabsList>
            <TabsContent value="links">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter web link..."
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                  />
                  <Button onClick={() => handleAddResource('link')} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <ScrollArea className="h-[200px]">
                  {currentDatasets.map((dataset, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 hover:bg-accent/10 rounded-lg">
                      <Link className="h-4 w-4 text-primary" />
                      <span className="flex-1">{dataset.name}</span>
                      <span className="text-sm text-muted-foreground">{dataset.lastUpdated}</span>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="files">
              <div className="space-y-4">
                <Button className="w-full" variant="outline">
                  <File className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
                <ScrollArea className="h-[200px]">
                  {currentDatasets.map((dataset, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 hover:bg-accent/10 rounded-lg">
                      <File className="h-4 w-4 text-primary" />
                      <span className="flex-1">{dataset.name}</span>
                      <span className="text-sm text-muted-foreground">{dataset.size}</span>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="images">
              <div className="space-y-4">
                <Button className="w-full" variant="outline">
                  <Image className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <ScrollArea className="h-[200px]">
                  <div className="grid grid-cols-2 gap-4">
                    {currentDatasets.map((dataset, index) => (
                      <div key={index} className="relative group aspect-square bg-accent/10 rounded-lg overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-xs truncate">{dataset.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Project Intelligence</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          The AI Research Assistant analyzes your project structure, suggests improvements,
          and provides insights based on patterns from similar projects in the knowledge base.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-accent/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-4 w-4" />
              <h3 className="font-medium">Code Analysis</h3>
            </div>
            <p className="text-sm text-muted-foreground">Real-time pattern analysis and suggestions</p>
          </div>
          <div className="p-4 bg-accent/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <GitBranch className="h-4 w-4" />
              <h3 className="font-medium">Project Structure</h3>
            </div>
            <p className="text-sm text-muted-foreground">Architecture and dependency insights</p>
          </div>
          <div className="p-4 bg-accent/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-4 w-4" />
              <h3 className="font-medium">Knowledge Base</h3>
            </div>
            <p className="text-sm text-muted-foreground">Access to patterns and best practices</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIResearcher;
