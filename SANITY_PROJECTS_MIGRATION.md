# Sanity Projects Migration Guide

## How to Add Projects in Sanity Studio

1. **Start your dev server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Open Sanity Studio**:
   - Navigate to `http://localhost:5173/studio` (or your dev URL + `/studio`)
   - You should see "Projects" in the sidebar

3. **Create a New Project**:
   - Click on "Projects" in the sidebar
   - Click the "Create" button (or "+" icon)
   - Fill in all the fields as shown below

4. **Important Fields**:
   - **Slug**: Click "Generate" to auto-generate from title, or type manually (e.g., `island-health-data-exchange`)
   - **Published At**: Set a date (required) - this determines when the project appears
   - **Main Image**: Upload an image or use the Unsplash URL provided
   - **Icon Name**: Use a Lucide icon name (e.g., `ActivitySquare`, `Brain`, `Database`, etc.)

5. **Publish**: Click "Publish" when done

---

## Project 1: Island-Wide Health Data Exchange

### Basic Information
- **Title (English)**: `Island-Wide Health Data Exchange Infrastructure`
- **Title (Spanish)**: `Infraestructura de Intercambio de Datos de Salud a Nivel Isla`
- **Slug**: `island-health-data-exchange` (click Generate or type manually)
- **Icon Name**: `ActivitySquare`

### Client & Sector
- **Client Name (English)**: `Puerto Rico Department of Health`
- **Client Name (Spanish)**: `Departamento de Salud de Puerto Rico`
- **Sector (English)**: `Public Health`
- **Sector (Spanish)**: `Salud Pública`

### Content (English)
- **Summary**: `Designed a real-time data pipeline integrating lab results, case management, and contact tracing across the island.`
- **Challenge**: `COVID-19 exposed deep fragmentation in the health department's data systems. Delays, duplication, and data silos impaired outbreak response and resource allocation.`
- **Solution**: `Stratum designed and implemented a centralized cloud system that connected all laboratories, hospitals, and contact tracing platforms with automated validation, deduplication, and dashboard-ready reporting.`
- **Results** (add each as a separate item):
  1. `Case reporting delay reduced by 90%`
  2. `Real-time dashboards fed from over 100 integrated data sources`
  3. `Automated tracking of outbreak clusters and public health actions`
  4. `System expanded to include flu and RSV surveillance`
  5. `Recognized as a core data infrastructure by PRDOH leadership`
- **Technologies** (add each as a separate item):
  1. `Python`
  2. `SQL Server`
  3. `Power BI`
  4. `Azure`
  5. `Custom APIs`
- **Timeline**: `5 months`
- **Team Size**: `6 specialists`

### Content (Spanish)
- **Summary**: `Diseñamos una canalización de datos en tiempo real que integra resultados de laboratorio, gestión de casos y rastreo de contactos en toda la isla.`
- **Challenge**: `La pandemia de COVID-19 reveló una fragmentación crítica en los sistemas de datos de salud del gobierno. Retrasos, duplicación y silos de información afectaban la respuesta efectiva.`
- **Solution**: `Stratum diseñó e implementó un sistema centralizado en la nube que conecta laboratorios, hospitales y plataformas de rastreo con validación automatizada y paneles en tiempo real.`
- **Results** (add each as a separate item):
  1. `Reducción del 90% en el retraso del reporte de casos`
  2. `Paneles actualizados en tiempo real desde más de 100 fuentes`
  3. `Seguimiento automatizado de brotes y respuestas de salud pública`
  4. `Sistema ampliado para incluir vigilancia de influenza y RSV`
  5. `Reconocido como infraestructura clave por el DS de Puerto Rico`
- **Technologies** (same as English - they're the same):
  1. `Python`
  2. `SQL Server`
  3. `Power BI`
  4. `Azure`
  5. `APIs Personalizadas`
- **Timeline**: `5 meses`
- **Team Size**: `6 especialistas`

### Media & Metadata
- **Main Image**: Upload an image, or use this URL: `https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&crop=center`
- **Tags** (add each as a separate item):
  1. `Public Health`
  2. `Data Integration`
  3. `Automation`
- **Featured Project**: ✅ Check this box
- **Published At**: `2024-12-10T00:00:00.000Z` (or select December 10, 2024)

### SEO (Optional but Recommended)
- **SEO Title (English)**: `Island-Wide Health Data Exchange Infrastructure - Public Health Data Project`
- **SEO Title (Spanish)**: `Infraestructura de Intercambio de Datos de Salud a Nivel Isla - Proyecto de Datos de Salud Pública`
- **SEO Description (English)**: `How Stratum PR helped the Puerto Rico Department of Health automate and unify its COVID-19 lab reporting, case tracking, and public health response systems.`
- **SEO Description (Spanish)**: `Cómo Stratum PR ayudó al Departamento de Salud de Puerto Rico a automatizar y unificar sus sistemas de reporte de laboratorio, seguimiento de casos y respuesta de salud pública para COVID-19.`
- **SEO Keywords (English)**: `public health, data exchange, pandemic response, government data automation, Puerto Rico health system`
- **SEO Keywords (Spanish)**: `salud pública, intercambio de datos, respuesta a pandemia, automatización de datos gubernamentales, sistema de salud de Puerto Rico`

---

## Project 2: Adaptive Machine Learning Engine

### Basic Information
- **Title (English)**: `Adaptive Machine Learning Engine`
- **Title (Spanish)**: `Motor de Aprendizaje Automático Adaptativo`
- **Slug**: `adaptive-ml-analytics-tool` (click Generate or type manually)
- **Icon Name**: `Brain`

### Client & Sector
- **Client Name (English)**: `Confidential Research Lab`
- **Client Name (Spanish)**: `Laboratorio de Investigación Confidencial`
- **Sector (English)**: `Research & Academia`
- **Sector (Spanish)**: `Investigación & Academia`

### Content (English)
- **Summary**: `Built a plug-and-play analytics engine that runs full EDA and ML pipelines across any dataset, generating results instantly.`
- **Challenge**: `The client needed to reduce time spent on manual data modeling while standardizing quality across research projects.`
- **Solution**: `We created an automated modeling engine that performs variable assessment, applies multiple ML models, tunes hyperparameters via grid search, and delivers clean visual reports.`
- **Results** (add each as a separate item):
  1. `90% reduction in manual modeling time`
  2. `Usable by researchers with no coding experience`
  3. `Significant boost in model accuracy and reproducibility`
  4. `Helped win grant funding by accelerating exploratory analysis`
  5. `Deployed across public health and behavioral science projects`
- **Technologies** (add each as a separate item):
  1. `Python`
  2. `Scikit-learn`
  3. `Streamlit`
  4. `Pandas`
  5. `Matplotlib`
- **Timeline**: `3 months`
- **Team Size**: `3 specialists`

### Content (Spanish)
- **Summary**: `Creamos un motor de análisis plug-and-play que ejecuta EDA y modelos ML en cualquier conjunto de datos, generando resultados instantáneamente.`
- **Challenge**: `El cliente necesitaba reducir el tiempo de modelado manual y estandarizar la calidad de los resultados entre proyectos.`
- **Solution**: `Desarrollamos un motor de modelado automatizado que analiza variables, aplica modelos ML, ajusta hiperparámetros y entrega informes visuales comprensibles.`
- **Results** (add each as a separate item):
  1. `Reducción del 90% en tiempo de modelado manual`
  2. `Usable por investigadores sin experiencia en programación`
  3. `Incremento notable en precisión y reproducibilidad`
  4. `Apoyó la obtención de fondos por análisis rápido de hipótesis`
  5. `Desplegado en proyectos de salud pública y ciencias sociales`
- **Technologies** (same as English):
  1. `Python`
  2. `Scikit-learn`
  3. `Streamlit`
  4. `Pandas`
  5. `Matplotlib`
- **Timeline**: `3 meses`
- **Team Size**: `3 especialistas`

### Media & Metadata
- **Main Image**: Upload an image, or use this URL: `https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&crop=center`
- **Tags** (add each as a separate item):
  1. `Machine Learning`
  2. `Automation`
  3. `Research`
- **Featured Project**: ✅ Check this box
- **Published At**: `2025-01-12T00:00:00.000Z` (or select January 12, 2025)

### SEO (Optional but Recommended)
- **SEO Title (English)**: `Adaptive Machine Learning Engine - Automated Data Science Platform`
- **SEO Title (Spanish)**: `Motor de Aprendizaje Automático Adaptativo - Plataforma de Ciencia de Datos Automatizada`
- **SEO Description (English)**: `Stratum PR developed a no-code tool that automatically analyzes datasets, identifies optimal models, and shares insights—empowering non-technical users with advanced analytics.`
- **SEO Description (Spanish)**: `Stratum PR desarrolló una herramienta sin código que analiza automáticamente los datos, identifica modelos óptimos y comparte resultados—capacitando a usuarios no técnicos con análisis avanzados.`
- **SEO Keywords (English)**: `machine learning, automated analytics, data science, no-code modeling, predictive modeling engine`
- **SEO Keywords (Spanish)**: `aprendizaje automático, análisis automatizado, ciencia de datos, modelado sin código, motor de modelado predictivo`

---

## Quick Tips

1. **For Images**: You can either:
   - Upload directly to Sanity (recommended for better performance)
   - Use the Unsplash URLs provided (they'll work but won't be optimized by Sanity)

2. **For Arrays** (Results, Technologies, Tags):
   - Click the "+" button to add each item
   - Type each item separately

3. **Published At Date**:
   - This is REQUIRED - projects won't show up without it
   - Use the date picker to select the date

4. **Slug**:
   - Must be unique
   - Use lowercase with hyphens (e.g., `island-health-data-exchange`)
   - Click "Generate" to auto-create from title

5. **After Publishing**:
   - Projects will appear on `/projects` page
   - Individual project pages will be at `/projects/{slug}`
   - If projects don't appear, check:
     - Published At date is set
     - Project is actually published (not just saved as draft)
     - Sanity environment variables are set correctly

---

## Verification

After adding projects:
1. Visit `http://localhost:5173/projects` (or your dev URL)
2. You should see the projects listed
3. Click on a project to see the detail page
4. Check browser console for any Sanity errors

If projects don't appear:
- Check browser console for errors
- Verify `VITE_SANITY_PROJECT_ID` is set in your `.env` file
- Make sure projects have a `publishedAt` date
- Ensure projects are published (not drafts)

