import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from 'lucide-react';

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    headerBg: 'bg-gray-100',
    textColor: 'text-gray-800',
    accentColor: 'text-blue-600',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    id: 'modern',
    name: 'Modern',
    headerBg: 'bg-gradient-to-r from-purple-500 to-pink-500',
    textColor: 'text-gray-100',
    accentColor: 'text-yellow-300',
    buttonColor: 'bg-yellow-300 hover:bg-yellow-400 text-gray-900',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    headerBg: 'bg-white',
    textColor: 'text-gray-900',
    accentColor: 'text-gray-500',
    buttonColor: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
  },
  {
    id: 'bold',
    name: 'Bold',
    headerBg: 'bg-black',
    textColor: 'text-white',
    accentColor: 'text-green-400',
    buttonColor: 'bg-green-400 hover:bg-green-500 text-black',
  },
];

const App = () => {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    company: '',
    description: '',
    email: '',
    phone: '',
    website: '',
    portfolioItems: [],
    services: [],
    testimonials: [],
  });

  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleTemplateChange = (templateId) => {
    const newTemplate = templates.find(t => t.id === templateId);
    setSelectedTemplate(newTemplate);
  };

  const handleArrayInputChange = (e, index, field) => {
    const { value } = e.target;
    setProfile((prevProfile) => {
      const newArray = [...prevProfile[field]];
      newArray[index] = value;
      return { ...prevProfile, [field]: newArray };
    });
  };

  const addArrayItem = (field) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: [...prevProfile[field], ''],
    }));
  };

  const removeArrayItem = (index, field) => {
    setProfile((prevProfile) => {
      const newArray = prevProfile[field].filter((_, i) => i !== index);
      return { ...prevProfile, [field]: newArray };
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Business Profile Creator</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Create Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="template">Choose Template</Label>
                <Select onValueChange={handleTemplateChange} defaultValue={selectedTemplate.id}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={profile.title}
                  onChange={handleInputChange}
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={profile.company}
                  onChange={handleInputChange}
                  placeholder="Tech Innovations Inc."
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={profile.description}
                  onChange={handleInputChange}
                  placeholder="A brief description of your professional background and expertise."
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={profile.website}
                  onChange={handleInputChange}
                  placeholder="https://www.example.com"
                />
              </div>
              <div>
                <Label>Portfolio Items</Label>
                {profile.portfolioItems.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={item}
                      onChange={(e) => handleArrayInputChange(e, index, 'portfolioItems')}
                      placeholder="Portfolio item title or link"
                    />
                    <Button 
                      type="button" 
                      onClick={() => removeArrayItem(index, 'portfolioItems')}
                      variant="destructive"
                      size="icon"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addArrayItem('portfolioItems')} variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Portfolio Item
                </Button>
              </div>
              <div>
                <Label>Services</Label>
                {profile.services.map((service, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={service}
                      onChange={(e) => handleArrayInputChange(e, index, 'services')}
                      placeholder="Service offering"
                    />
                    <Button 
                      type="button" 
                      onClick={() => removeArrayItem(index, 'services')}
                      variant="destructive"
                      size="icon"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addArrayItem('services')} variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Service
                </Button>
              </div>
              <div>
                <Label>Testimonials</Label>
                {profile.testimonials.map((testimonial, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Textarea
                      value={testimonial}
                      onChange={(e) => handleArrayInputChange(e, index, 'testimonials')}
                      placeholder="Client testimonial"
                      rows={2}
                    />
                    <Button 
                      type="button" 
                      onClick={() => removeArrayItem(index, 'testimonials')}
                      variant="destructive"
                      size="icon"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addArrayItem('testimonials')} variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Testimonial
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Mobile Preview</h2>
          <MobilePreview profile={profile} template={selectedTemplate} />
        </div>
      </div>
    </div>
  );
};

const MobilePreview = ({ profile, template }) => {
  return (
    <div className="max-w-sm mx-auto border border-gray-200 rounded-lg overflow-hidden shadow-lg bg-white">
      {/* Hero Section */}
      <div className={`p-4 ${template.headerBg}`}>
        <div className="flex items-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gray-300 mr-4"></div>
          <div>
            <h2 className={`text-2xl font-bold ${template.textColor}`}>
              {profile.name || 'Your Name'}
            </h2>
            <p className={`${template.accentColor}`}>
              {profile.title || 'Your Title'} {profile.company && `at ${profile.company}`}
            </p>
          </div>
        </div>
        <Button className={`w-full ${template.buttonColor}`}>Contact Me</Button>
      </div>

      {/* Contact Info */}
      <div className="p-4 border-b">
        <h3 className={`text-lg font-semibold mb-2 ${template.textColor}`}>Contact Info</h3>
        <p className={`${template.accentColor}`}>Email: {profile.email || 'your.email@example.com'}</p>
        <p className={`${template.accentColor}`}>Phone: {profile.phone || '(123) 456-7890'}</p>
        <p className={`${template.accentColor}`}>Website: {profile.website || 'www.example.com'}</p>
      </div>

      {/* Description */}
      <div className="p-4 border-b">
        <p className={`${template.textColor}`}>
          {profile.description || 'Your professional description will appear here.'}
        </p>
      </div>

      {/* Portfolio/Work Showcase */}
      {profile.portfolioItems.length > 0 && (
        <div className="p-4 border-b">
          <h3 className={`text-lg font-semibold mb-2 ${template.textColor}`}>Portfolio</h3>
          <div className="flex overflow-x-auto gap-2">
            {profile.portfolioItems.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-40 h-24 bg-gray-200 rounded flex items-center justify-center">
                <span className={`text-sm ${template.accentColor}`}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Service Offerings */}
      {profile.services.length > 0 && (
        <div className="p-4 border-b">
          <h3 className={`text-lg font-semibold mb-2 ${template.textColor}`}>Services</h3>
          <ul className="list-disc list-inside">
            {profile.services.map((service, index) => (
              <li key={index} className={`${template.accentColor}`}>{service}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Testimonials/Reviews */}
      {profile.testimonials.length > 0 && (
        <div className="p-4 border-b">
          <h3 className={`text-lg font-semibold mb-2 ${template.textColor}`}>Testimonials</h3>
          {profile.testimonials.map((testimonial, index) => (
            <blockquote key={index} className={`italic mb-2 ${template.textColor}`}>"{testimonial}"</blockquote>
          ))}
        </div>
      )}

      {/* Call to Action/Share Options */}
      <div className="p-4">
        <Button className={`w-full mb-2 ${template.buttonColor}`}>Hire Me</Button>
        <div className="flex justify-center gap-2">
          <Button variant="outline" size="sm">Share</Button>
          <Button variant="outline" size="sm">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default App;
