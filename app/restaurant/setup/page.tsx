import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function RestaurantSetupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="mx-auto max-w-2xl w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Restaurant Setup</CardTitle>
          <CardDescription>Complete your restaurant profile to start receiving orders</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="restaurant-name">Restaurant Name</Label>
                <Input id="restaurant-name" type="text" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="restaurant-type">Restaurant Type</Label>
                  <Select>
                    <SelectTrigger id="restaurant-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fast-food">Fast Food</SelectItem>
                      <SelectItem value="casual-dining">Casual Dining</SelectItem>
                      <SelectItem value="fine-dining">Fine Dining</SelectItem>
                      <SelectItem value="cafe">Café</SelectItem>
                      <SelectItem value="food-truck">Food Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="food-category">Food Category</Label>
                  <Select>
                    <SelectTrigger id="food-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="american">American</SelectItem>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                      <SelectItem value="indian">Indian</SelectItem>
                      <SelectItem value="mexican">Mexican</SelectItem>
                      <SelectItem value="japanese">Japanese</SelectItem>
                      <SelectItem value="thai">Thai</SelectItem>
                      <SelectItem value="mediterranean">Mediterranean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Restaurant Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell customers about your restaurant, cuisine, and specialties..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" type="text" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" type="text" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" type="text" required />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="branch-number">Branch Number (if applicable)</Label>
                <Input id="branch-number" type="text" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="restaurant-logo">Restaurant Logo</Label>
                <Input id="restaurant-logo" type="file" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="restaurant-images">Restaurant Images (up to 5)</Label>
                <Input id="restaurant-images" type="file" multiple />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="opening-time">Opening Time</Label>
                  <Input id="opening-time" type="time" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="closing-time">Closing Time</Label>
                  <Input id="closing-time" type="time" required />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Complete Setup</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

