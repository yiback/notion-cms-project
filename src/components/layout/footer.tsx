import { Container } from './container'

export function Footer() {
  return (
    <footer className="border-border/40 border-t">
      <Container>
        <div className="py-10">
          <p className="text-muted-foreground text-center text-sm">
            © 2025 TIL Garden. Powered by Notion.
          </p>
        </div>
      </Container>
    </footer>
  )
}
