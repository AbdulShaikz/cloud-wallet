import { useNavigate, useLocation } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "../components/ui/button"

export function BackButton() {
  const navigate = useNavigate()
  const location = useLocation()

  if (location.pathname === "/") return null

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-4 left-4 z-50"
      onClick={() => navigate(-1)}
      aria-label="Back"
    >
      <ArrowLeft className="w-5 h-5" />
    </Button>
  )
}