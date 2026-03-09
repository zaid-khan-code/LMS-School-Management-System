'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Trash2, ChevronRight, ChevronLeft, Check, BookOpen, FileText, Settings2, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const colorOptions = [
  { label: 'Ocean Blue', value: 'from-blue-500 to-blue-700', class: 'bg-gradient-to-br from-blue-500 to-blue-700' },
  { label: 'Royal Purple', value: 'from-purple-500 to-purple-700', class: 'bg-gradient-to-br from-purple-500 to-purple-700' },
  { label: 'Emerald', value: 'from-green-500 to-emerald-700', class: 'bg-gradient-to-br from-green-500 to-emerald-700' },
  { label: 'Sunset', value: 'from-amber-500 to-orange-600', class: 'bg-gradient-to-br from-amber-500 to-orange-600' },
  { label: 'Rose', value: 'from-pink-500 to-rose-600', class: 'bg-gradient-to-br from-pink-500 to-rose-600' },
  { label: 'Cyan', value: 'from-cyan-500 to-teal-600', class: 'bg-gradient-to-br from-cyan-500 to-teal-600' },
]

const step1Schema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  grade_level: z.string().min(1, 'Grade level is required'),
  thumbnail_color: z.string().min(1, 'Pick a color'),
})

const lessonSchema = z.object({ title: z.string().min(1) })
const moduleSchema = z.object({
  title: z.string().min(1),
  lessons: z.array(lessonSchema),
})
const step2Schema = z.object({ modules: z.array(moduleSchema) })

const step3Schema = z.object({
  published: z.boolean(),
  enrollment_limit: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
})

type Step1Data = z.infer<typeof step1Schema>
type Step2Data = z.infer<typeof step2Schema>
type Step3Data = z.infer<typeof step3Schema>

const steps = [
  { label: 'Basic Info', icon: BookOpen },
  { label: 'Content', icon: FileText },
  { label: 'Settings', icon: Settings2 },
  { label: 'Publish', icon: Rocket },
]

export default function CreateCoursePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null)
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null)
  const [step3Data, setStep3Data] = useState<Step3Data | null>(null)
  const [published, setPublished] = useState(false)

  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { title: '', description: '', subject: '', grade_level: '', thumbnail_color: '' },
  })

  const form2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: { modules: [{ title: 'Module 1: Introduction', lessons: [{ title: 'Welcome' }] }] },
  })

  const form3 = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: { published: false, enrollment_limit: '', start_date: '', end_date: '' },
  })

  const { fields: moduleFields, append: appendModule, remove: removeModule } = useFieldArray({
    control: form2.control,
    name: 'modules',
  })

  const handleStep1 = form1.handleSubmit((data) => {
    setStep1Data(data)
    setCurrentStep(1)
  })

  const handleStep2 = form2.handleSubmit((data) => {
    setStep2Data(data)
    setCurrentStep(2)
  })

  const handleStep3 = form3.handleSubmit((data) => {
    setStep3Data(data)
    setCurrentStep(3)
  })

  const selectedColor = form1.watch('thumbnail_color')

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
        <p className="text-muted-foreground mt-1">Build a comprehensive learning experience</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-0">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                i < currentStep ? 'bg-primary border-primary text-primary-foreground' :
                i === currentStep ? 'border-primary text-primary bg-primary/10' :
                'border-muted-foreground/30 text-muted-foreground'
              )}>
                {i < currentStep ? <Check className="h-5 w-5" /> : <step.icon className="h-4 w-4" />}
              </div>
              <span className={cn('text-xs font-medium hidden sm:block', i === currentStep ? 'text-primary' : 'text-muted-foreground')}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn('flex-1 h-0.5 mx-2 mt-[-1rem]', i < currentStep ? 'bg-primary' : 'bg-muted')} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {currentStep === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Set up the core details of your course</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStep1} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title *</Label>
                <Input id="title" placeholder="e.g. Advanced Mathematics" {...form1.register('title')} />
                {form1.formState.errors.title && (
                  <p className="text-xs text-red-500">{form1.formState.errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder="Describe what students will learn..."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  {...form1.register('description')}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Subject *</Label>
                  <Select onValueChange={(v) => form1.setValue('subject', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Literature', 'World History', 'Computer Science', 'Art'].map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form1.formState.errors.subject && (
                    <p className="text-xs text-red-500">{form1.formState.errors.subject.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Grade Level *</Label>
                  <Select onValueChange={(v) => form1.setValue('grade_level', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map((g) => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form1.formState.errors.grade_level && (
                    <p className="text-xs text-red-500">{form1.formState.errors.grade_level.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <Label>Thumbnail Color *</Label>
                <div className="flex gap-3 flex-wrap">
                  {colorOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => form1.setValue('thumbnail_color', opt.value)}
                      className={cn(
                        'h-12 w-12 rounded-lg transition-all',
                        opt.class,
                        selectedColor === opt.value ? 'ring-2 ring-offset-2 ring-primary scale-110' : 'hover:scale-105'
                      )}
                      title={opt.label}
                    />
                  ))}
                </div>
                {form1.formState.errors.thumbnail_color && (
                  <p className="text-xs text-red-500">{form1.formState.errors.thumbnail_color.message}</p>
                )}
              </div>
              <div className="flex justify-end pt-2">
                <Button type="submit">
                  Next <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Content */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Course Content</CardTitle>
            <CardDescription>Organize your course into modules and lessons</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStep2} className="space-y-4">
              {moduleFields.map((moduleField, mIdx) => (
                <ModuleBuilder
                  key={moduleField.id}
                  mIdx={mIdx}
                  control={form2.control}
                  register={form2.register}
                  onRemove={() => removeModule(mIdx)}
                  canRemove={moduleFields.length > 1}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendModule({ title: `Module ${moduleFields.length + 1}`, lessons: [{ title: '' }] })}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Module
              </Button>
              <div className="flex justify-between pt-2">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(0)}>
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back
                </Button>
                <Button type="submit">
                  Next <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Settings */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Course Settings</CardTitle>
            <CardDescription>Configure enrollment and scheduling options</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStep3} className="space-y-5">
              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div>
                  <p className="font-medium">Published</p>
                  <p className="text-sm text-muted-foreground">Make this course visible to students</p>
                </div>
                <button
                  type="button"
                  onClick={() => { setPublished(!published); form3.setValue('published', !published) }}
                  className={cn(
                    'relative h-6 w-11 rounded-full transition-colors',
                    published ? 'bg-primary' : 'bg-muted-foreground/30'
                  )}
                >
                  <span className={cn('absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform', published && 'translate-x-5')} />
                </button>
              </div>
              <div className="space-y-2">
                <Label>Enrollment Limit</Label>
                <Input type="number" placeholder="Leave blank for unlimited" {...form3.register('enrollment_limit')} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="date" {...form3.register('start_date')} />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input type="date" {...form3.register('end_date')} />
                </div>
              </div>
              <div className="flex justify-between pt-2">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back
                </Button>
                <Button type="submit">
                  Next <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Review & Publish */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Review & Publish</CardTitle>
            <CardDescription>Review your course before publishing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step1Data && (
              <div className="space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Basic Info</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Title:</span> <span className="font-medium ml-1">{step1Data.title}</span></div>
                  <div><span className="text-muted-foreground">Subject:</span> <span className="font-medium ml-1">{step1Data.subject}</span></div>
                  <div><span className="text-muted-foreground">Grade:</span> <span className="font-medium ml-1">{step1Data.grade_level}</span></div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Color:</span>
                    <span className={`inline-block h-5 w-5 rounded-full bg-gradient-to-br ${step1Data.thumbnail_color}`} />
                  </div>
                  {step1Data.description && (
                    <div className="col-span-2"><span className="text-muted-foreground">Description:</span> <span className="ml-1">{step1Data.description}</span></div>
                  )}
                </div>
              </div>
            )}
            <Separator />
            {step2Data && (
              <div className="space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Content — {step2Data.modules.length} module{step2Data.modules.length !== 1 ? 's' : ''}
                </h3>
                {step2Data.modules.map((m, i) => (
                  <div key={i} className="text-sm">
                    <p className="font-medium">{m.title}</p>
                    <p className="text-muted-foreground">{m.lessons.length} lesson{m.lessons.length !== 1 ? 's' : ''}</p>
                  </div>
                ))}
              </div>
            )}
            <Separator />
            {step3Data && (
              <div className="space-y-2 text-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Settings</h3>
                <p><span className="text-muted-foreground">Status:</span> <span className="font-medium ml-1">{step3Data.published ? 'Published' : 'Draft'}</span></p>
                {step3Data.enrollment_limit && <p><span className="text-muted-foreground">Max Students:</span> <span className="font-medium ml-1">{step3Data.enrollment_limit}</span></p>}
                {step3Data.start_date && <p><span className="text-muted-foreground">Start:</span> <span className="font-medium ml-1">{step3Data.start_date}</span></p>}
                {step3Data.end_date && <p><span className="text-muted-foreground">End:</span> <span className="font-medium ml-1">{step3Data.end_date}</span></p>}
              </div>
            )}
            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                <ChevronLeft className="mr-1 h-4 w-4" /> Back
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Rocket className="mr-2 h-4 w-4" />
                {step3Data?.published ? 'Publish Course' : 'Save as Draft'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function ModuleBuilder({
  mIdx,
  control,
  register,
  onRemove,
  canRemove,
}: {
  mIdx: number
  control: ReturnType<typeof useForm<Step2Data>>['control']
  register: ReturnType<typeof useForm<Step2Data>>['register']
  onRemove: () => void
  canRemove: boolean
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `modules.${mIdx}.lessons`,
  })

  return (
    <div className="rounded-lg border p-4 space-y-3 bg-muted/20">
      <div className="flex items-center gap-2">
        <Input placeholder={`Module ${mIdx + 1} title`} {...register(`modules.${mIdx}.title`)} className="flex-1" />
        {canRemove && (
          <Button type="button" variant="ghost" size="icon" onClick={onRemove} className="text-red-500 hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="pl-4 space-y-2">
        {fields.map((field, lIdx) => (
          <div key={field.id} className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground flex-shrink-0" />
            <Input placeholder={`Lesson ${lIdx + 1} title`} {...register(`modules.${mIdx}.lessons.${lIdx}.title`)} className="flex-1 h-8 text-sm" />
            {fields.length > 1 && (
              <Button type="button" variant="ghost" size="icon" onClick={() => remove(lIdx)} className="h-8 w-8 text-muted-foreground hover:text-red-500">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => append({ title: '' })}
          className="text-xs h-7 text-muted-foreground hover:text-foreground"
        >
          <Plus className="mr-1 h-3 w-3" /> Add Lesson
        </Button>
      </div>
    </div>
  )
}
