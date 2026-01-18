import { Container } from './container'

export function Footer() {
  return (
    <footer className="border-t border-border/40">
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
