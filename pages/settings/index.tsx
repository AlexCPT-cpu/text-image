import { Settings } from "lucide-react";
import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { Sidebar } from "@/components/sidebar";
import Navbar from "@/components/navbar";

const SettingsPage = () => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        <Sidebar isPro={true} apiLimitCount={0} />
      </div>
      <main className="md:pl-72 pb-10">
        <Navbar />
        <div>
          <Heading
            title="Settings"
            description="Manage account settings."
            icon={Settings}
            iconColor="text-gray-700"
            bgColor="bg-gray-700/10"
          />
          <div className="px-4 lg:px-8 space-y-4">
            <div className="text-muted-foreground text-sm">
              {true
                ? "You are currently on a Pro plan."
                : "You are currently on a free plan."}
            </div>
            <SubscriptionButton isPro={true} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
