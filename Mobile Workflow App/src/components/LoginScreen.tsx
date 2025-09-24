import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center px-6 py-8">
      <div className="mx-auto w-full max-w-sm space-y-8">
        {/* Logo placeholder */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
            <div className="w-12 h-12 bg-primary rounded opacity-20"></div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-foreground"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-12 bg-input-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-foreground"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-12 bg-input-background border-border"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onLogin}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Login
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 bg-background border-border text-foreground hover:bg-muted/50"
            >
              <div className="w-5 h-5 mr-3 rounded bg-muted flex-shrink-0"></div>
              Continue with Google
            </Button>
          </div>

          {/* Forgot password link */}
          <div className="text-center">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}