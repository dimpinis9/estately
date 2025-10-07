import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <main className="p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark">
              Settings
            </h1>
          </header>

          <div className="space-y-12">
            {/* Profile Section */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-8 shadow-lg">
              <div className="border-b border-muted-light/20 dark:border-muted-dark/20 mb-8">
                <nav className="flex gap-8 -mb-px">
                  <a
                    className="py-4 px-1 border-b-2 border-primary text-primary font-bold"
                    href="#"
                  >
                    Profile
                  </a>
                  <a
                    className="py-4 px-1 border-b-2 border-transparent text-muted-light dark:text-muted-dark hover:text-primary hover:border-primary transition-colors font-medium"
                    href="#"
                  >
                    Preferences
                  </a>
                  <a
                    className="py-4 px-1 border-b-2 border-transparent text-muted-light dark:text-muted-dark hover:text-primary hover:border-primary transition-colors font-medium"
                    href="#"
                  >
                    Notifications
                  </a>
                </nav>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                <div className="col-span-1 md:col-span-3">
                  <h2 className="text-2xl font-bold mb-6">
                    Profile Information
                  </h2>
                </div>

                {/* Profile Picture */}
                <div className="md:col-span-1 flex flex-col items-center">
                  <label
                    className="block text-sm font-medium mb-4 text-muted-light dark:text-muted-dark"
                    htmlFor="profilePicture"
                  >
                    Profile Picture
                  </label>
                  <div className="relative group">
                    <div className="relative p-1 rounded-full bg-gradient-to-r from-primary to-purple-500">
                      <Avatar className="w-32 h-32">
                        <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuCltamDpJvqRMfD-Wef05ybuEeUp3595vd2lQnDPA7YcoGV6cQ6tWHvZorQCuo6DJngYTmJsVJqy8zrq8wRSHz7K3ItY4-p2CyEKZrngMosUSvm5IJb4665lxWhW13qDQFLW_woyaqyxLCBPslZb-82mgcobrtbAAoglsdZZMwMMVNAuwisEjE9GgIAMh6bnEDDKs2UZKxCXVPnaHKgOkQcrVvQQYiTe0Mqs9MjZ4YyNOfR1CcMJV5kc0V9qabA3K93pO-dVmfB6kc" />
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                    </div>
                    <label
                      className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      htmlFor="profilePictureInput"
                    >
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                        <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </label>
                    <input
                      className="hidden"
                      id="profilePictureInput"
                      type="file"
                    />
                  </div>
                  <p className="text-xs text-muted-light dark:text-muted-dark mt-4 text-center">
                    Click image to upload a new one. <br /> Recommended size:
                    200x200px
                  </p>
                </div>

                {/* Profile Form */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mt-6 md:mt-0">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2 text-muted-light dark:text-muted-dark"
                      htmlFor="fullName"
                    >
                      Full Name
                    </label>
                    <Input
                      className="w-full rounded-lg bg-background-light dark:bg-background-dark border-muted-light/20 dark:border-muted-dark/20 focus:ring-primary focus:border-primary"
                      id="fullName"
                      type="text"
                      defaultValue="Sarah Miller"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2 text-muted-light dark:text-muted-dark"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <Input
                      className="w-full rounded-lg bg-background-light dark:bg-background-dark border-muted-light/20 dark:border-muted-dark/20 focus:ring-primary focus:border-primary"
                      id="email"
                      type="email"
                      defaultValue="sarah.miller@email.com"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2 text-muted-light dark:text-muted-dark"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <Input
                      className="w-full rounded-lg bg-background-light dark:bg-background-dark border-muted-light/20 dark:border-muted-dark/20 focus:ring-primary focus:border-primary"
                      id="phone"
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2 text-muted-light dark:text-muted-dark"
                      htmlFor="company"
                    >
                      Company
                    </label>
                    <Input
                      className="w-full rounded-lg bg-background-light dark:bg-background-dark border-muted-light/20 dark:border-muted-dark/20 focus:ring-primary focus:border-primary"
                      id="company"
                      type="text"
                      defaultValue="Estately Inc."
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2 text-muted-light dark:text-muted-dark"
                      htmlFor="jobTitle"
                    >
                      Job Title
                    </label>
                    <Input
                      className="w-full rounded-lg bg-background-light dark:bg-background-dark border-muted-light/20 dark:border-muted-dark/20 focus:ring-primary focus:border-primary"
                      id="jobTitle"
                      type="text"
                      defaultValue="Lead Agent"
                    />
                  </div>
                </div>

                {/* Account Security */}
                <div className="col-span-1 md:col-span-3 pt-8">
                  <h2 className="text-2xl font-bold mb-6">Account Security</h2>
                </div>
                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2 text-muted-light dark:text-muted-dark"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <Input
                      className="w-full rounded-lg bg-background-light dark:bg-background-dark border-muted-light/20 dark:border-muted-dark/20 focus:ring-primary focus:border-primary"
                      id="password"
                      type="password"
                      defaultValue="************"
                    />
                  </div>
                </div>

                {/* Update Button */}
                <div className="col-span-1 md:col-span-3 flex justify-end items-center pt-8">
                  <Button className="px-6 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-primary to-purple-500 hover:shadow-lg transition-all">
                    Update Profile
                  </Button>
                </div>
              </div>
            </div>

            {/* Connected Accounts */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Connected Accounts</h2>
              <p className="text-muted-light dark:text-muted-dark mb-8">
                Connect your social media and CRM accounts to streamline your
                workflow.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Facebook */}
                <div className="border border-muted-light/20 dark:border-muted-dark/20 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-background-light dark:bg-surface-dark flex items-center justify-center mb-4 shadow-lg">
                    <svg
                      className="w-8 h-8 text-[#1877F2]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06c0 5.52 4.5 10.02 10 10.02s10-4.5 10-10.02C22 6.53 17.5 2.04 12 2.04zM13.6 19.95V13.5h2.1l.3-2.5h-2.4v-1.6c0-.7.2-1.2 1.2-1.2h1.3V5.8c-.2 0-.9-.1-1.8-.1-1.8 0-3 1.1-3 3.1v1.8h-2v2.5h2V20c-3.6-.8-6.3-4-6.3-7.9 0-4.4 3.6-8 8-8s8 3.6 8 8c0 3.9-2.7 7.1-6.3 7.9z"></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">Facebook</h3>
                  <p className="text-sm text-green-500 mb-4">Connected</p>
                  <Button
                    variant="outline"
                    className="px-5 py-2.5 rounded-lg font-medium text-sm text-red-500 border-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    Disconnect
                  </Button>
                </div>

                {/* Twitter/X */}
                <div className="border border-muted-light/20 dark:border-muted-dark/20 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-background-light dark:bg-surface-dark flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-[#1DA1F2]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22.46,6c-.77.35-1.6.58-2.46.67.88-.53,1.56-1.37,1.88-2.38-.83.49-1.74.85-2.7,1.03-.78-.84-1.9-1.36-3.12-1.36-2.36,0-4.28,1.92-4.28,4.28,0,.34.04.67.11,1-3.56-.18-6.72-1.88-8.83-4.47-.37.63-.58,1.37-.58,2.15,0,1.48.75,2.79,1.9,3.55-.7-.02-1.36-.22-1.93-.53v.05c0,2.07,1.47,3.8,3.42,4.19-.36.1-.73.15-1.12.15-.27,0-.54-.03-.8-.08.54,1.7,2.12,2.93,3.98,2.97-1.46,1.14-3.3,1.82-5.3,1.82-.34,0-.68-.02-1.02-.06,1.89,1.21,4.14,1.92,6.56,1.92,7.88,0,12.19-6.53,12.19-12.19,0-.19,0-.37-.01-.56.84-.6,1.56-1.36,2.14-2.22z"></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">X (Twitter)</h3>
                  <p className="text-sm text-muted-light dark:text-muted-dark mb-4">
                    Not connected
                  </p>
                  <Button className="px-5 py-2.5 rounded-lg font-medium text-sm bg-gradient-to-r from-primary to-purple-500 text-white hover:shadow-lg transition-all">
                    Connect
                  </Button>
                </div>

                {/* Instagram */}
                <div className="border border-muted-light/20 dark:border-muted-dark/20 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-background-light dark:bg-surface-dark flex items-center justify-center mb-4 shadow-lg">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <radialGradient
                          cx="30.134%"
                          cy="100%"
                          fx="30.134%"
                          fy="100%"
                          id="ig-gradient"
                          r="141.421%"
                        >
                          <stop offset="0%" stopColor="#FFC107"></stop>
                          <stop offset="50%" stopColor="#F44336"></stop>
                          <stop offset="100%" stopColor="#9C27B0"></stop>
                        </radialGradient>
                      </defs>
                      <rect
                        fill="url(#ig-gradient)"
                        height="24"
                        rx="4"
                        width="24"
                      ></rect>
                      <path
                        d="M12 16.25c-2.344 0-4.25-1.906-4.25-4.25S9.656 7.75 12 7.75s4.25 1.906 4.25 4.25-1.906 4.25-4.25 4.25z"
                        stroke="#fff"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M16.333 7.667a.792.792 0 100-1.584.792.792 0 000 1.584z"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M17.5 12c0 3.038-2.462 5.5-5.5 5.5S6.5 15.038 6.5 12 8.962 6.5 12 6.5s5.5 2.462 5.5 5.5z"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">Instagram</h3>
                  <p className="text-sm text-green-500 mb-4">Connected</p>
                  <Button
                    variant="outline"
                    className="px-5 py-2.5 rounded-lg font-medium text-sm text-red-500 border-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    Disconnect
                  </Button>
                </div>

                {/* LinkedIn */}
                <div className="border border-muted-light/20 dark:border-muted-dark/20 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-background-light dark:bg-surface-dark flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-[#0077B5]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.45,2H3.55A1.55,1.55,0,0,0,2,3.55V20.45A1.55,1.55,0,0,0,3.55,22h16.9A1.55,1.55,0,0,0,22,20.45V3.55A1.55,1.55,0,0,0,20.45,2ZM8,18H5V8H8ZM6.5,6.73A1.73,1.73,0,1,1,8.23,5,1.73,1.73,0,0,1,6.5,6.73ZM18,18H15V13.3c0-1.12-.4-1.89-1.42-1.89-1,0-1.58.68-1.58,1.86V18H9V8h3v1.32h.05c.4-.76,1.38-1.54,3.1-1.54,3.31,0,3.85,2.18,3.85,5V18Z"></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">LinkedIn</h3>
                  <p className="text-sm text-muted-light dark:text-muted-dark mb-4">
                    Not connected
                  </p>
                  <Button className="px-5 py-2.5 rounded-lg font-medium text-sm bg-gradient-to-r from-primary to-purple-500 text-white hover:shadow-lg transition-all">
                    Connect
                  </Button>
                </div>

                {/* Zillow */}
                <div className="border border-muted-light/20 dark:border-muted-dark/20 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-background-light dark:bg-surface-dark flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.158 2.007C10.74 2.152 7.15 3.327 5.67 7.027C4.192 10.727 5.176 16.273 8.358 18.995C8.358 18.995 9.48 22 12.158 22C14.836 22 15.958 18.995 15.958 18.995C19.141 16.273 20.124 10.727 18.646 7.027C17.168 3.327 13.578 2.152 12.158 2.007Z"
                        fill="#0088CE"
                      ></path>
                      <path
                        d="M9.826 8.337C10.154 7.621 11.082 7.027 12.158 7.027C13.234 7.027 14.162 7.621 14.49 8.337H9.826Z"
                        fill="#FFF"
                      ></path>
                      <path
                        d="M12.158 17.068C13.914 17.068 15.342 15.618 15.342 13.837C15.342 12.055 13.914 10.605 12.158 10.605C10.402 10.605 8.974 12.055 8.974 13.837C8.974 15.618 10.402 17.068 12.158 17.068Z"
                        fill="#FFF"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">Zillow</h3>
                  <p className="text-sm text-muted-light dark:text-muted-dark mb-4">
                    Not connected
                  </p>
                  <Button className="px-5 py-2.5 rounded-lg font-medium text-sm bg-gradient-to-r from-primary to-purple-500 text-white hover:shadow-lg transition-all">
                    Connect
                  </Button>
                </div>

                {/* Add New Account */}
                <div className="border border-dashed border-muted-light/40 dark:border-muted-dark/40 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 rounded-full bg-background-light dark:bg-surface-dark flex items-center justify-center mb-4 border-2 border-dashed border-muted-light/40 dark:border-muted-dark/40 group-hover:border-primary transition-colors">
                    <svg
                      className="w-8 h-8 text-muted-light dark:text-muted-dark group-hover:text-primary transition-colors"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="12" x2="12" y1="5" y2="19"></line>
                      <line x1="5" x2="19" y1="12" y2="12"></line>
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">Add New Account</h3>
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    Connect other platforms
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
