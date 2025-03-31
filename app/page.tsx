"use client";

import { useState, useEffect } from "react";
import {
  Dices,
  MapPin,
  Clock,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Info,
  Lightbulb,
  Zap,
  Compass,
  CreditCard,
  Package,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToWaitlist } from "@/app/actions";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="bg-gradient-to-r from-[#ff9000] to-[#ff5500] hover:from-[#ff9000]/90 hover:to-[#ff5500]/90 text-white group relative overflow-hidden"
      disabled={pending}
    >
      {pending ? (
        <span className="flex items-center gap-1">
          <Loader2 className="h-4 w-4 animate-spin" />
          Joining...
        </span>
      ) : (
        <span className="relative z-10 flex items-center gap-1">
          Join Waitlist
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      )}
      <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform"></span>
    </Button>
  );
}

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formState, setFormState] = useState<{
    status: "idle" | "success" | "error";
    message: string;
  }>({
    status: "idle",
    message: "",
  });

  useEffect(() => {
    setMounted(true);

    // Initial animations
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  async function handleSubmit(formData: FormData) {
    const result = await subscribeToWaitlist(formData);

    setFormState({
      status: result.success ? "success" : "error",
      message: result.message,
    });

    if (result.success) {
      setEmail("");

      // Reset form state after 5 seconds
      setTimeout(() => {
        setFormState({
          status: "idle",
          message: "",
        });
      }, 5000);
    }
  }

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#ff9000]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#4d4dff]/10 rounded-full blur-3xl"></div>

        {/* Floating dice animations */}
        <div
          className={`absolute top-[15%] right-[10%] transition-all duration-1000 ${
            isAnimating ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="animate-bounce delay-300 p-2 bg-[#ff9000]/20 rounded-lg backdrop-blur-sm">
            <Dices className="h-6 w-6 text-[#ff9000]" />
          </div>
        </div>
        <div
          className={`absolute bottom-[25%] left-[15%] transition-all duration-1000 ${
            isAnimating ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="animate-bounce delay-700 p-2 bg-[#4d4dff]/20 rounded-lg backdrop-blur-sm">
            <Dices className="h-6 w-6 text-[#4d4dff]" />
          </div>
        </div>
        <div
          className={`absolute top-[40%] left-[5%] transition-all duration-1000 ${
            isAnimating ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="animate-bounce delay-500 p-2 bg-[#ff9000]/20 rounded-lg backdrop-blur-sm">
            <Sparkles className="h-6 w-6 text-[#ff9000]" />
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
        <div className="w-full max-w-2xl mx-auto text-center space-y-10">
          {/* Logo */}
          <div
            className={`flex items-center justify-center gap-3 mb-6 transition-all duration-700 ${
              isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-gradient-to-br from-[#ff9000] to-[#ff5500] shadow-lg">
              <Dices className="absolute inset-0 m-auto h-8 w-8 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white block text-left">
                I'm Feeling Lucky
              </span>
              <span className="text-[#ff9000] text-sm block text-left">
                Delicious surprises delivered
              </span>
            </div>
          </div>

          {/* Coming Soon Badge */}
          <div
            className={`inline-flex mx-auto px-3 py-1 rounded-full bg-[#ff9000]/20 text-[#ff9000] text-sm font-medium transition-all duration-700 ${
              isAnimating ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Coming Soon
          </div>

          {/* Main Heading */}
          <h1
            className={`text-3xl md:text-4xl font-bold tracking-tighter text-white transition-all duration-700 text-balance ${
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            Let Luck Decide Your Next Meal
          </h1>

          {/* Description */}
          <p
            className={`text-[#d1d1e9] text-lg max-w-sm mx-auto transition-all duration-700 text-balance ${
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            For the indecisive, the adventurous, and everyone who wants to add a
            dash of surprise to mealtime.
          </p>

          {/* What section - Grid Tiles */}
          <div
            className={`transition-all duration-700 ${
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white inline-flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-[#ff9000]" />
                <span>What is this?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-[#ff9000]/20 to-[#ff5500]/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#ff9000] to-[#ff5500] flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                    <Lightbulb className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Decision-Free Dining
                  </h3>
                  <p className="text-[#d1d1e9] text-balance">
                    Perfect for those who struggle with the eternal question:
                    "What should I eat today?"
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#ff9000]/20 to-[#ff5500]/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#ff9000] to-[#ff5500] flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Everyday Adventure
                  </h3>
                  <p className="text-[#d1d1e9] text-balance">
                    Add a spark of excitement to your routine with surprise
                    meals that break the monotony.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#ff9000]/20 to-[#ff5500]/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#ff9000] to-[#ff5500] flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                    <Compass className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Culinary Discovery
                  </h3>
                  <p className="text-[#d1d1e9] text-balance">
                    Discover hidden gems and new favorite dishes through
                    personalized random selections.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How section - Grid Tiles */}
          <div
            className={`transition-all duration-700 ${
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white inline-flex items-center gap-2">
                <Info className="h-6 w-6 text-[#4d4dff]" />
                <span>How it works</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-[#4d4dff]/20 to-[#6a6aff]/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#4d4dff] to-[#6a6aff] flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Share Your Location
                  </h3>
                  <p className="text-[#d1d1e9] text-balance">
                    Tell us where to deliver your surprise meal so we can find
                    the best options nearby.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#4d4dff]/20 to-[#6a6aff]/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#4d4dff] to-[#6a6aff] flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Pick Your Time
                  </h3>
                  <p className="text-[#d1d1e9] text-balance">
                    Schedule when you want your surprise to arrive, whether it's
                    ASAP or later in the day.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#4d4dff]/20 to-[#6a6aff]/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#4d4dff] to-[#6a6aff] flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                    <CreditCard className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Set Your Budget
                  </h3>
                  <p className="text-[#d1d1e9] text-balance">
                    Pre-purchase credits (starting at $20) to fund your culinary
                    adventures.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#4d4dff]/20 to-[#6a6aff]/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#4d4dff] to-[#6a6aff] flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                    <Package className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Enjoy The Surprise
                  </h3>
                  <p className="text-[#d1d1e9] text-balance">
                    We order via Uber Eats and deliver a mystery meal that
                    matches your preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Waitlist CTA */}
          <div
            className={`pt-6 transition-all duration-700 ${
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            <div className="bg-gradient-to-r from-[#ff9000] to-[#ff5500] p-[1px] rounded-xl overflow-hidden">
              <div className="bg-[#1a1a2e]/90 backdrop-blur-sm rounded-xl p-5 text-center space-y-4">
                <h2 className="text-xl font-medium text-white text-balance">
                  If you're interested, join the waitlist
                </h2>

                {formState.status === "success" ? (
                  <div className="bg-green-500/20 text-green-300 p-4 rounded-lg flex items-center gap-2 justify-center">
                    <CheckCircle className="h-5 w-5" />
                    <p className="text-balance">{formState.message}</p>
                  </div>
                ) : (
                  <form action={handleSubmit} className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 bg-white/10 border-white/10 text-white placeholder:text-white/50 focus-visible:ring-[#ff9000]"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <SubmitButton />
                    </div>

                    {formState.status === "error" && (
                      <div className="bg-red-500/20 text-red-300 p-2 rounded-lg flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <p>{formState.message}</p>
                      </div>
                    )}

                    <p className="text-xs text-[#d1d1e9] text-balance">
                      Be the first to try our service when we launch. No spam,
                      just lucky updates.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer
        className={`w-full py-6 border-t border-white/10 relative z-10 transition-all duration-700 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <p className="text-xs text-[#d1d1e9] text-balance">
              © {new Date().getFullYear()} I'm Feeling Lucky. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
