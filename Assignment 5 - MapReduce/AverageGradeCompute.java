import java.io.IOException;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.FloatWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;

import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;


public class AverageGradeCompute {

public static class MapperClass extends
  Mapper<LongWritable, Text, Text, FloatWritable> {
 public void map(LongWritable key, Text studentRecord, Context con)
   throws IOException, InterruptedException {
  String[] word = studentRecord.toString().split(" ");
  String courseCode = word[1];
  try {
   Float marks = Float.parseFloat(word[2]);
   con.write(new Text(courseCode), new FloatWritable(marks));
  } catch (Exception e) {
   e.printStackTrace();
  }
 }
}

public static class ReducerClass extends
  Reducer<Text, FloatWritable, Text, Text> {
 public void reduce(Text key, Iterable<FloatWritable> valueList,
   Context con) throws IOException, InterruptedException {
  try {
   Float total = (float) 0;
   int count = 0;
   for (FloatWritable var : valueList) {
    total += var.get();
    System.out.println("reducer " + var.get());
    count++;
   }
   Float avg = (Float) total / count;
   String out = "Total: " + total + " :: " + "Average: " + avg;
   con.write(key, new Text(out));
  } catch (Exception e) {
   e.printStackTrace();
  }
 }
}

public static void main(String[] args) {
 Configuration conf = new Configuration();
 try {
  Job job = Job.getInstance(conf, "FindAverageCourseGrade");
  job.setJarByClass(AverageGradeCompute.class);
  job.setMapperClass(MapperClass.class);
  job.setReducerClass(ReducerClass.class);
  job.setOutputKeyClass(Text.class);
  job.setOutputValueClass(FloatWritable.class);
  // Path p1 = new Path(args[0]);
  // Path p2 = new Path(args[1]);
  // FileInputFormat.addInputPath(job, p1);
  // FileOutputFormat.setOutputPath(job, p2);
  Path pathInput = new Path(args[0]);
  Path pathOutputDir = new Path(args[1]);
  FileInputFormat.addInputPath(job, pathInput);
  FileOutputFormat.setOutputPath(job, pathOutputDir);
  System.exit(job.waitForCompletion(true) ? 0 : 1);
 } catch (IOException e) {
  e.printStackTrace();
 } catch (ClassNotFoundException e) {
  e.printStackTrace();
 } catch (InterruptedException e) {
  e.printStackTrace();
 }

}
}