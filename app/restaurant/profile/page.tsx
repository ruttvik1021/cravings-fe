"use client";

import { Camera, Edit, Save } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import PageHeader from "@/components/pageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/authContext";
// import { DocumentViewerModal } from "@/app/restaurant/components/document-viewer-modal";

export default function RestaurantProfilePage() {
  const { user } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  // const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  // const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  // Mock restaurant admin data
  const [adminData, setAdminData] = useState<any>({});

  // Mock documents
  const documents = [
    {
      id: 1,
      name: "ID Card",
      status: "Verified",
      uploadDate: "2023-01-15",
      url: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      name: "Business License",
      status: "Verified",
      uploadDate: "2023-01-15",
      url: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      name: "Food Handler's Permit",
      status: "Pending",
      uploadDate: "2023-02-20",
      url: "/placeholder.svg?height=400&width=600",
    },
  ];

  const navItems = [
    {
      title: "Dashboard",
      href: "/restaurant/dashboard",
      icon: (props: { className?: string }) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={props.className}
        >
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      ),
    },
    {
      title: "Orders",
      href: "/restaurant/orders",
      icon: (props: { className?: string }) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={props.className}
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
    },
    {
      title: "Menu",
      href: "/restaurant/menu",
      icon: (props: { className?: string }) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={props.className}
        >
          <path d="M3 7V5c0-1.1.9-2 2-2h2" />
          <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
          <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
          <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
          <path d="M8 7v10" />
          <path d="M12 7v10" />
          <path d="M16 7v10" />
        </svg>
      ),
    },
    {
      title: "Financials",
      href: "/restaurant/financials",
      icon: (props: { className?: string }) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={props.className}
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: "Profile",
      href: "/restaurant/profile",
      icon: (props: { className?: string }) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={props.className}
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  const handleSaveProfile = () => {
    // In a real app, this would save the profile data to the backend
    setIsEditMode(false);
  };

  // const handleViewDocument = (documentUrl: string) => {
  //   setSelectedDocument(documentUrl);
  //   setIsDocumentModalOpen(true);
  // };

  return (
    <div>
      <PageHeader title="Profile" />

      <div>
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Manage your personal details
                    </CardDescription>
                  </div>
                  {/* <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditMode(!isEditMode)}
                    className="border-cerulean text-cerulean hover:bg-cerulean/10 dark:border-cerulean-dark dark:text-cerulean-dark dark:hover:bg-cerulean-dark/10"
                  >
                    {isEditMode ? (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </>
                    )}
                  </Button> */}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-non-photo-blue dark:border-non-photo-blue-dark">
                        <Image
                          src={user?.profilePhoto || "/placeholder.svg"}
                          alt="Profile"
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                      {isEditMode && (
                        <Button
                          size="icon"
                          className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-cerulean hover:bg-cerulean/90 dark:bg-cerulean-dark dark:hover:bg-cerulean-dark/90"
                        >
                          <Camera className="h-4 w-4" />
                          <span className="sr-only">
                            Change profile picture
                          </span>
                        </Button>
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium text-lg">{user?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={user?.name}
                          disabled={!isEditMode}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user?.email}
                          disabled={!isEditMode}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Primary Phone</Label>
                        <Input
                          id="phone"
                          value={user?.phone}
                          disabled={!isEditMode}
                        />
                      </div>
                    </div>
                    {/* <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={adminData.address}
                        onChange={(e) =>
                          setAdminData({
                            ...adminData,
                            address: e.target.value,
                          })
                        }
                        disabled={!isEditMode}
                      />
                    </div> */}
                    {isEditMode && (
                      <div className="flex justify-end">
                        <Button
                          onClick={handleSaveProfile}
                          className="bg-cerulean hover:bg-cerulean/90 text-white dark:bg-cerulean-dark dark:hover:bg-cerulean-dark/90"
                        >
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Current Password
                        </Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirm New Password
                        </Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button className="bg-cerulean hover:bg-cerulean/90 text-white dark:bg-cerulean-dark dark:hover:bg-cerulean-dark/90">
                        Update Password
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* {selectedDocument && (
        <DocumentViewerModal
          documentUrl={selectedDocument}
          open={isDocumentModalOpen}
          onOpenChange={setIsDocumentModalOpen}
        />
      )} */}
    </div>
  );
}
