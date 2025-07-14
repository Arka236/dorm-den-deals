import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Settings, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
}

export default function Account() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
        setFullName(data.full_name || '');
        setPhone(data.phone || '');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          phone: phone,
        })
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update profile",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
        fetchProfile(user.id);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Success",
        description: "Signed out successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="container py-8">
          <Card className="text-center py-12 max-w-md mx-auto">
            <CardContent>
              <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Please sign in</h3>
              <p className="text-muted-foreground mb-6">
                You need to be signed in to view your account
              </p>
              <Button className="button-gradient">
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{profile?.full_name || 'User'}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Separator className="mb-4" />
                  <nav className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <MapPin className="mr-2 h-4 w-4" />
                      Addresses
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={updateProfile} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user.email || ''}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="button-gradient" disabled={updating}>
                      {updating ? "Updating..." : "Update Profile"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">0</p>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">$0.00</p>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">0</p>
                      <p className="text-sm text-muted-foreground">Wishlist Items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}