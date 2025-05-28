"use client"

import { useState } from "react"
import {
  Satellite,
  Wifi,
  Ban,
  Clock,
  Pause,
  Play,
  Settings,
  Activity,
  Laptop,
  Smartphone,
  Tv,
  GamepadIcon as Game,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for connected devices
const initialDevices = [
  {
    id: "1",
    name: "John's iPhone",
    mac: "A1:B2:C3:D4:E5:F6",
    ip: "192.168.1.101",
    type: "smartphone",
    status: "online",
    paused: false,
    blocked: false,
    dataUsed: 1.7,
    lastSeen: "Now",
  },
  {
    id: "2",
    name: "Living Room TV",
    mac: "G7:H8:I9:J0:K1:L2",
    ip: "192.168.1.102",
    type: "tv",
    status: "online",
    paused: false,
    blocked: false,
    dataUsed: 8.2,
    lastSeen: "Now",
  },
  {
    id: "3",
    name: "Gaming PC",
    mac: "M3:N4:O5:P6:Q7:R8",
    ip: "192.168.1.103",
    type: "laptop",
    status: "online",
    paused: false,
    blocked: false,
    dataUsed: 12.5,
    lastSeen: "Now",
  },
  {
    id: "4",
    name: "Sarah's iPad",
    mac: "S9:T0:U1:V2:W3:X4",
    ip: "192.168.1.104",
    type: "smartphone",
    status: "online",
    paused: false,
    blocked: false,
    dataUsed: 3.8,
    lastSeen: "Now",
  },
  {
    id: "5",
    name: "Unknown Device",
    mac: "Y5:Z6:A7:B8:C9:D0",
    ip: "192.168.1.105",
    type: "unknown",
    status: "online",
    paused: false,
    blocked: false,
    dataUsed: 0.3,
    lastSeen: "Now",
  },
  {
    id: "6",
    name: "Work Laptop",
    mac: "E1:F2:G3:H4:I5:J6",
    ip: "192.168.1.106",
    type: "laptop",
    status: "offline",
    paused: false,
    blocked: false,
    dataUsed: 5.1,
    lastSeen: "2 hours ago",
  },
  {
    id: "7",
    name: "Nintendo Switch",
    mac: "K7:L8:M9:N0:O1:P2",
    ip: "192.168.1.107",
    type: "game",
    status: "offline",
    paused: false,
    blocked: false,
    dataUsed: 4.3,
    lastSeen: "3 hours ago",
  },
]

export default function StarlinkWifiManager() {
  const [devices, setDevices] = useState(initialDevices)
  const [searchTerm, setSearchTerm] = useState("")
  const [editDevice, setEditDevice] = useState(null)
  const [newDeviceName, setNewDeviceName] = useState("")

  // Filter devices based on search term
  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ip.includes(searchTerm) ||
      device.mac.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Count online devices
  const onlineDevices = devices.filter((device) => device.status === "online" && !device.blocked).length

  // Calculate total data usage
  const totalDataUsage = devices.reduce((sum, device) => sum + device.dataUsed, 0)

  // Toggle pause status for a device
  const togglePause = (id) => {
    setDevices(devices.map((device) => (device.id === id ? { ...device, paused: !device.paused } : device)))
  }

  // Toggle block status for a device
  const toggleBlock = (id) => {
    setDevices(
      devices.map((device) => (device.id === id ? { ...device, blocked: !device.blocked, paused: false } : device)),
    )
  }

  // Save edited device name
  const saveDeviceName = () => {
    if (editDevice && newDeviceName) {
      setDevices(devices.map((device) => (device.id === editDevice.id ? { ...device, name: newDeviceName } : device)))
      setEditDevice(null)
      setNewDeviceName("")
    }
  }

  // Get icon based on device type
  const getDeviceIcon = (type) => {
    switch (type) {
      case "smartphone":
        return <Smartphone className="h-5 w-5" />
      case "laptop":
        return <Laptop className="h-5 w-5" />
      case "tv":
        return <Tv className="h-5 w-5" />
      case "game":
        return <Game className="h-5 w-5" />
      default:
        return <Wifi className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Satellite className="h-8 w-8 text-blue-400" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Starlink</h1>
                <p className="text-xs text-slate-400">WiFi Manager</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                Connected
              </Badge>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="devices" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="devices" className="data-[state=active]:bg-blue-600">
              <Wifi className="h-4 w-4 mr-2" />
              Devices
            </TabsTrigger>
            <TabsTrigger value="controls" className="data-[state=active]:bg-blue-600">
              <Settings className="h-4 w-4 mr-2" />
              Controls
            </TabsTrigger>
            <TabsTrigger value="usage" className="data-[state=active]:bg-blue-600">
              <Activity className="h-4 w-4 mr-2" />
              Usage
            </TabsTrigger>
          </TabsList>

          <TabsContent value="devices" className="space-y-6">
            {/* Network Status Card */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Network Status</CardTitle>
                <CardDescription className="text-slate-400">
                  {onlineDevices} devices connected to your Starlink WiFi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-white">{onlineDevices}</div>
                    <div className="text-xs text-slate-400">Online Devices</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-yellow-400">{devices.filter((d) => d.paused).length}</div>
                    <div className="text-xs text-slate-400">Paused</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-400">{devices.filter((d) => d.blocked).length}</div>
                    <div className="text-xs text-slate-400">Blocked</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-400">{totalDataUsage.toFixed(1)}</div>
                    <div className="text-xs text-slate-400">GB Used Today</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search and Filter */}
            <div className="relative">
              <Input
                className="bg-slate-800/50 border-slate-700 text-white pl-10"
                placeholder="Search devices by name, IP, or MAC address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-2.5 text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>

            {/* Connected Devices List */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Connected Devices</CardTitle>
                <CardDescription className="text-slate-400">
                  Manage devices connected to your Starlink WiFi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {filteredDevices.map((device) => (
                      <div
                        key={device.id}
                        className={`p-4 rounded-lg border ${
                          device.blocked
                            ? "bg-red-900/20 border-red-700/30"
                            : device.paused
                              ? "bg-yellow-900/20 border-yellow-700/30"
                              : device.status === "online"
                                ? "bg-slate-800/70 border-slate-700"
                                : "bg-slate-800/30 border-slate-700/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-full ${
                                device.blocked ? "bg-red-500/20" : device.paused ? "bg-yellow-500/20" : "bg-blue-500/20"
                              }`}
                            >
                              {getDeviceIcon(device.type)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-white">{device.name}</h3>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => {
                                        setEditDevice(device)
                                        setNewDeviceName(device.name)
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path d="M12 20h9"></path>
                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                      </svg>
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="bg-slate-800 border-slate-700">
                                    <DialogHeader>
                                      <DialogTitle className="text-white">Edit Device Name</DialogTitle>
                                      <DialogDescription className="text-slate-400">
                                        Change the name of this device for easier identification
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="name" className="text-slate-300">
                                          Device Name
                                        </Label>
                                        <Input
                                          id="name"
                                          value={newDeviceName}
                                          onChange={(e) => setNewDeviceName(e.target.value)}
                                          className="bg-slate-700 border-slate-600 text-white"
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button
                                        variant="outline"
                                        onClick={() => setEditDevice(null)}
                                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                                      >
                                        Cancel
                                      </Button>
                                      <Button onClick={saveDeviceName}>Save Changes</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-slate-400">
                                <span>{device.ip}</span>
                                <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                                <span>{device.mac}</span>
                              </div>
                              <div className="mt-1 flex items-center gap-2">
                                {device.status === "online" ? (
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Online</Badge>
                                ) : (
                                  <Badge variant="outline" className="border-slate-600 text-slate-400">
                                    Last seen {device.lastSeen}
                                  </Badge>
                                )}
                                {device.paused && (
                                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                    Paused
                                  </Badge>
                                )}
                                {device.blocked && (
                                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Blocked</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`rounded-full ${
                                device.paused
                                  ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300"
                                  : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 hover:text-yellow-300"
                              }`}
                              onClick={() => togglePause(device.id)}
                              disabled={device.blocked || device.status === "offline"}
                            >
                              {device.paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`rounded-full ${
                                device.blocked
                                  ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300"
                                  : "bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300"
                              }`}
                              onClick={() => toggleBlock(device.id)}
                              disabled={device.status === "offline"}
                            >
                              {device.blocked ? <Wifi className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-full bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-300"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="12" cy="5" r="1"></circle>
                                    <circle cx="12" cy="19" r="1"></circle>
                                  </svg>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-slate-800 border-slate-700 text-slate-300">
                                <DropdownMenuItem className="hover:bg-slate-700 hover:text-white cursor-pointer">
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-slate-700 hover:text-white cursor-pointer">
                                  Set Priority
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-slate-700 hover:text-white cursor-pointer">
                                  Schedule Access
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-400 hover:bg-red-900/30 hover:text-red-300 cursor-pointer">
                                  Forget Device
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="controls" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Access Controls</CardTitle>
                <CardDescription className="text-slate-400">
                  Set up schedules and restrictions for your network
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">Pause All Devices</h3>
                      <p className="text-sm text-slate-400">Temporarily pause internet for all connected devices</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">Guest Network</h3>
                      <p className="text-sm text-slate-400">Enable separate network for visitors</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">Auto-Block New Devices</h3>
                      <p className="text-sm text-slate-400">Require approval for new connections</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <h3 className="font-medium text-white mb-4">Scheduled Access Times</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-slate-800/70 border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-400" />
                          <h4 className="font-medium text-white">Bedtime Mode</h4>
                        </div>
                        <Switch />
                      </div>
                      <p className="text-sm text-slate-400 mb-3">Disable internet access during sleeping hours</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-slate-400">Start Time</Label>
                          <Input className="bg-slate-700 border-slate-600 text-white" defaultValue="22:00" />
                        </div>
                        <div>
                          <Label className="text-xs text-slate-400">End Time</Label>
                          <Input className="bg-slate-700 border-slate-600 text-white" defaultValue="07:00" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-800/70 border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-purple-400" />
                          <h4 className="font-medium text-white">Study Time</h4>
                        </div>
                        <Switch />
                      </div>
                      <p className="text-sm text-slate-400 mb-3">Limit access to educational sites only</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-slate-400">Start Time</Label>
                          <Input className="bg-slate-700 border-slate-600 text-white" defaultValue="15:00" />
                        </div>
                        <div>
                          <Label className="text-xs text-slate-400">End Time</Label>
                          <Input className="bg-slate-700 border-slate-600 text-white" defaultValue="18:00" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Control Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Data Usage</CardTitle>
                <CardDescription className="text-slate-400">Monitor bandwidth consumption by device</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-white">Today's Usage</h3>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {totalDataUsage.toFixed(1)} GB
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {devices
                      .sort((a, b) => b.dataUsed - a.dataUsed)
                      .map((device) => (
                        <div key={device.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {getDeviceIcon(device.type)}
                              <span className="text-sm text-slate-300">{device.name}</span>
                            </div>
                            <span className="text-sm font-medium text-white">{device.dataUsed.toFixed(1)} GB</span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{
                                width: `${(device.dataUsed / Math.max(...devices.map((d) => d.dataUsed))) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="pt-4 border-t border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-white">Usage Limits</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        Set Limits
                      </Button>
                    </div>
                    <p className="text-sm text-slate-400">
                      No usage limits currently set. Set limits to automatically pause devices when they reach their
                      allocated data usage.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
