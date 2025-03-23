"use client";

import PageHeader from "@/components/pageHeader";
import ProfileSection from "@/components/profile-section";
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
import { useAuth } from "@/lib/authContext";
import { useState } from "react";
import { DocumentViewerModal } from "@/components/document-viewer";

export default function RestaurantProfilePage() {
  const { user } = useAuth();
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const handleViewDocument = (documentUrl: string) => {
    setSelectedDocument(documentUrl);
  };
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
            <ProfileSection />
            <div className="space-y-4">
              {user?.idPhoto && (
                <>
                  <div className="border rounded-lg p-4 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Registration Document</h3>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleViewDocument(user?.idPhoto || "")
                          }
                          className="border-cerulean text-cerulean hover:bg-cerulean/10 dark:border-cerulean-dark dark:text-cerulean-dark dark:hover:bg-cerulean-dark/10"
                        >
                          View Document
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
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

      {selectedDocument && (
        <DocumentViewerModal
          documentUrl={selectedDocument}
          open={!!selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
}
