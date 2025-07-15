import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    course: "B.Tech CSE, IIT BHU",
    rating: 5,
    comment: "Amazing quality mattress! Very comfortable and affordable. Perfect for hostel life.",
    product: "Premium Mattress",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Priya Patel",
    course: "B.Sc Physics, DU",
    rating: 4,
    comment: "Good pillows, very soft and supportive. Fast delivery to my hostel.",
    product: "Comfort Pillows",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Amit Kumar",
    course: "MBA, IIM Lucknow", 
    rating: 5,
    comment: "Complete toiletries kit saved me so much time! Everything I needed in one package.",
    product: "Toiletries Kit",
    date: "3 weeks ago"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    course: "B.Com, Miranda House",
    rating: 4,
    comment: "Great initiative for students. Affordable prices and good quality products.",
    product: "Premium Mattress",
    date: "2 months ago"
  },
  {
    id: 5,
    name: "Vikash Singh",
    course: "B.Tech Mechanical, NIT Patna",
    rating: 5,
    comment: "Excellent service! The QR code payment was super convenient. Highly recommended!",
    product: "Comfort Pillows",
    date: "1 week ago"
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">({rating}/5)</span>
    </div>
  );
};

export default function Reviews() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Reviews</h1>
          <p className="text-muted-foreground">
            See what fellow students are saying about College Essentials
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.id} className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{review.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{review.course}</p>
                  </div>
                  <Badge variant="secondary">{review.product}</Badge>
                </div>
                <StarRating rating={review.rating} />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">"{review.comment}"</p>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Share Your Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Have you purchased from College Essentials? We'd love to hear about your experience!
              </p>
              <p className="text-sm text-muted-foreground">
                Contact us at reviews@collegeessentials.com to share your review.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}