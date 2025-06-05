
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Resource } from "@/data/resources";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface ResourceModalProps {
  resource: Resource | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ResourceModal = ({ resource, isOpen, onClose }: ResourceModalProps) => {
  const { language, t } = useLanguage();

  if (!resource) return null;

  const content = resource.content[language];

  const renderPreview = () => {
    if (content.type === 'guide' || content.type === 'checklist' || content.type === 'worksheet') {
      return <MarkdownRenderer resourceSlug={resource.slug} />;
    }
    
    if (content.type === 'toolkit') {
      return <MarkdownRenderer resourceSlug={resource.slug} />;
    }

    // For other types, show description
    return (
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 leading-relaxed">
          {content.description}
        </p>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="font-telegraf font-bold text-2xl text-primary">
            {content.title}
          </DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-3 py-1 text-sm font-telegraf bg-primary/10 text-primary rounded-full capitalize">
              {content.type}
            </span>
            {resource.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-3 py-1 text-sm font-telegraf bg-secondary/10 text-secondary rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-6">
          {renderPreview()}
        </div>
        
        <div className="pt-4 border-t bg-gray-50 -mx-6 -mb-6 px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
            <p className="text-sm text-gray-600 font-telegraf">
              {t('resources.modal.downloadDescription')}
            </p>
            <div className="flex gap-2">
              {content.downloadUrl && (
                <Button 
                  asChild
                  className="bg-primary hover:bg-primary/90 text-white font-telegraf"
                >
                  <a 
                    href={content.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {t('resources.downloadTemplate')}
                  </a>
                </Button>
              )}
              {content.externalUrl && (
                <Button 
                  asChild
                  variant="outline"
                  className="font-telegraf"
                >
                  <a 
                    href={content.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t('resources.visitExternal')}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
